
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodeViewerProps {
  code: {
    python: string;
    java: string;
    c: string;
    javascript: string;
    pseudocode?: string;
  };
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  const languages = [
    { key: 'python', label: 'Python', color: 'bg-blue-500' },
    { key: 'java', label: 'Java', color: 'bg-orange-500' },
    { key: 'c', label: 'C', color: 'bg-gray-600' },
    { key: 'javascript', label: 'JavaScript', color: 'bg-yellow-500' },
    { key: 'pseudocode', label: 'Pseudocode', color: 'bg-purple-500' },
  ];

  return (
    <Tabs defaultValue="python" className="w-full">
      {/* Mobile-optimized horizontal scrollable tabs */}
      <div className="overflow-x-auto pb-2">
        <TabsList className="inline-flex h-auto p-1 bg-background/30 gap-1 min-w-max">
          {languages.map(({ key, label, color }) => (
            <TabsTrigger 
              key={key}
              value={key} 
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`}></div>
                {label}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      <TabsContent value="python" className="mt-4">
        <div className="bg-background/20 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            <code className="language-python text-foreground">{code.python}</code>
          </pre>
        </div>
      </TabsContent>
      
      <TabsContent value="java" className="mt-4">
        <div className="bg-background/20 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            <code className="language-java text-foreground">{code.java}</code>
          </pre>
        </div>
      </TabsContent>
      
      <TabsContent value="c" className="mt-4">
        <div className="bg-background/20 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            <code className="language-c text-foreground">{code.c}</code>
          </pre>
        </div>
      </TabsContent>
      
      <TabsContent value="javascript" className="mt-4">
        <div className="bg-background/20 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            <code className="language-javascript text-foreground">{code.javascript}</code>
          </pre>
        </div>
      </TabsContent>
      
      <TabsContent value="pseudocode" className="mt-4">
        <div className="bg-background/20 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            <code className="text-foreground">{code.pseudocode || 'Pseudocode not available'}</code>
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CodeViewer;
