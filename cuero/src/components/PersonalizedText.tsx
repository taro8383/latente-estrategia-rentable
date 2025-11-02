import React, { useMemo } from 'react';
import { usePersonalization } from '@/context/PersonalizationProvider';

interface PersonalizedTextProps {
  children: string | React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const PersonalizedText: React.FC<PersonalizedTextProps> = ({
  children,
  className,
  as: Component = 'span'
}) => {
  const { replacer, isPersonalized } = usePersonalization();
  
  // Process children recursively so we can handle mixed strings and JSX elements
  const processNode = (node: any): React.ReactNode => {
    if (typeof node === 'string') {
      if (!replacer) return node;
      const replaced = replacer.replace(node);
      const processedText = replacer.replaceIndustryKeywords(replaced);
      const parts = processedText.split(/(<[^>]*>)/);
      return parts.map((part, index) => {
        if (part.startsWith('<') && part.endsWith('>')) {
          return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      });
    }

    if (Array.isArray(node)) {
      return node.map((n, i) => <React.Fragment key={i}>{processNode(n)}</React.Fragment>);
    }

    if (React.isValidElement(node)) {
      // Preserve element props but process its children
      return React.cloneElement(node, { ...node.props }, processNode((node.props as any).children));
    }

    return node;
  };

  // Use useMemo to avoid re-processing unless personalization or children change
  const processedContent = useMemo(() => {
    return processNode(children);
  }, [children, isPersonalized, replacer]);
  
  return (
    <Component className={className}>
      {processedContent}
    </Component>
  );
};