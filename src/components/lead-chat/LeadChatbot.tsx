import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ChatMessage from './ChatMessage';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lead-chat`;

interface LeadChatbotProps {
  onBriefGenerated?: (brief: any) => void;
  onMessagesChange?: (messages: Message[]) => void;
  isUnlocked?: boolean;
  onFirstMessageAttempt?: (message: string) => void;
}

const LeadChatbot = ({ 
  onBriefGenerated, 
  onMessagesChange,
  isUnlocked = true,
  onFirstMessageAttempt,
}: LeadChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Bonjour ! 👋 Je suis **Léa**, chef de projet digital chez Dikio Studio. Je suis là pour vous aider à donner vie à votre projet.\n\n**Quel type de projet avez-vous en tête ?** (site web, application mobile, plateforme SaaS, e-commerce...)"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages container (skip on initial load)
  useEffect(() => {
    if (!isInitialLoad && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange, isInitialLoad]);

  // Mark initial load as complete after first render
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  // Extract JSON brief from message
  const extractBriefFromMessage = (content: string) => {
    const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.action === 'generate_summary' && parsed.data) {
          return parsed.data;
        }
      } catch (e) {
        console.error('Failed to parse brief JSON:', e);
      }
    }
    return null;
  };

  // Stream chat response
  const streamChat = async (userMessage: string) => {
    const userMsg: Message = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);
    setInput('');

    let assistantContent = '';

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erreur de connexion');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Check if the response contains a brief
      const brief = extractBriefFromMessage(assistantContent);
      if (brief) {
        onBriefGenerated?.(brief);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
      // Remove the user message if failed
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // If not unlocked and this is the first real message attempt, trigger security gate
    if (!isUnlocked && onFirstMessageAttempt) {
      onFirstMessageAttempt(input.trim());
      return;
    }
    
    streamChat(input.trim());
  };

  // Expose streamChat for parent to trigger after unlock
  const sendMessage = (message: string) => {
    if (message.trim()) {
      streamChat(message.trim());
    }
  };

  // Expose sendMessage to parent via ref pattern using a callback
  React.useEffect(() => {
    if (isUnlocked && (window as any).__pendingLeaChatMessage) {
      const pendingMessage = (window as any).__pendingLeaChatMessage;
      delete (window as any).__pendingLeaChatMessage;
      sendMessage(pendingMessage);
    }
  }, [isUnlocked]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-xl overflow-hidden isolate border">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold">Léa - Chef de Projet</h2>
            <p className="text-sm text-primary-foreground/80">Dikio Studio</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="h-[400px] overflow-y-auto overscroll-contain p-4 space-y-4 bg-muted/30"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </AnimatePresence>
        
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Léa réfléchit...</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Décrivez votre projet..."
            className="min-h-[44px] max-h-32 resize-none"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Appuyez sur Entrée pour envoyer, Shift+Entrée pour un saut de ligne
        </p>
      </form>
    </div>
  );
};

export default LeadChatbot;
