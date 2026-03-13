import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import LeadChatbot from '@/components/lead-chat/LeadChatbot';
import BriefSummaryPanel from '@/components/lead-chat/BriefSummaryPanel';
import SubmitBriefDialog from '@/components/lead-chat/SubmitBriefDialog';
import SecurityGateDialog from '@/components/lead-chat/SecurityGateDialog';

const ProjectForm = () => {
  const { t } = useTranslation();
  const [extractedBrief, setExtractedBrief] = useState<any>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([]);
  
  // Security gate state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSecurityGate, setShowSecurityGate] = useState(false);
  const [userContact, setUserContact] = useState<{ fullName: string; email: string; phone?: string } | null>(null);
  
  const handleBriefGenerated = useCallback((brief: any) => {
    setExtractedBrief(brief);
  }, []);

  const handleMessagesChange = useCallback((messages: { role: string; content: string }[]) => {
    setConversationHistory(messages);
  }, []);

  const handleSubmitClick = () => {
    setShowSubmitDialog(true);
  };

  // Handle first message attempt - show security gate
  const handleFirstMessageAttempt = useCallback((message: string) => {
    // Store the pending message
    (window as any).__pendingLeaChatMessage = message;
    setShowSecurityGate(true);
  }, []);

  // Handle security verification complete
  const handleSecurityVerified = useCallback((data: { fullName: string; email: string; phone?: string }) => {
    setUserContact(data);
    setIsUnlocked(true);
    // The LeadChatbot will pick up the pending message via the useEffect
  }, []);

  return (
    <div className="min-h-screen bg-dikio-background">
      <SEO 
        title="Démarrer votre projet"
        description="Discutez avec Léa, notre assistante IA, pour définir votre projet. En quelques minutes, obtenez un brief personnalisé et démarrez votre collaboration avec Dikio."
        keywords="démarrer projet, brief projet, chatbot IA, consultation gratuite, dikio"
        url="https://dikio.fr/project-form"
      />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            {t('projectForm.badge')}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('projectForm.title')} <span className="text-primary">{t('projectForm.titleHighlight')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projectForm.description')}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {/* Chat Section */}
          <div className={extractedBrief ? '' : 'lg:col-span-2 max-w-3xl mx-auto w-full'}>
            <LeadChatbot 
              onBriefGenerated={handleBriefGenerated}
              onMessagesChange={handleMessagesChange}
              isUnlocked={isUnlocked}
              onFirstMessageAttempt={handleFirstMessageAttempt}
            />
          </div>

          {/* Summary Panel - appears when brief is generated */}
          <AnimatePresence>
            {extractedBrief && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-[540px]"
              >
                <BriefSummaryPanel 
                  brief={extractedBrief} 
                  onSubmit={handleSubmitClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Submit Dialog */}
      <SubmitBriefDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        brief={extractedBrief}
        conversationHistory={conversationHistory}
      />

      {/* Security Gate Dialog */}
      <SecurityGateDialog
        open={showSecurityGate}
        onOpenChange={setShowSecurityGate}
        onVerified={handleSecurityVerified}
      />
    </div>
  );
};

export default ProjectForm;
