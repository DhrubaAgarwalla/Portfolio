import { ChatMessage, ChatbotResponse, ConversationContext, APIResponse } from '@/types/chatbot';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class GroqService {
  private apiKey = import.meta.env.VITE_GROQ_API_KEY;
  private baseUrl = 'https://api.groq.com/openai/v1';
  private model = import.meta.env.VITE_CHATBOT_MODEL || 'llama-3.3-70b-versatile'; // Fast and efficient model with 8K+ context, default updated from deprecated llama3-8k

  private getSystemPrompt(context: ConversationContext): string {
    const ownerName = import.meta.env.VITE_OWNER_NAME || 'Dhruba Kumar Agarwalla';
    const ownerTitle = import.meta.env.VITE_OWNER_TITLE || 'AI-Orchestrated Full-Stack Developer';

    // Build conversation context string
    let conversationContext = '';

    if (context.conversationSummary) {
      conversationContext += `\nCONVERSATION SUMMARY: ${context.conversationSummary}\n`;
    }

    if (context.discussedTopics.length > 0) {
      conversationContext += `\nPREVIOUSLY DISCUSSED TOPICS: ${context.discussedTopics.join(', ')}\n`;
    }

    if (context.currentTopic) {
      conversationContext += `\nCURRENT TOPIC: ${context.currentTopic}\n`;
    }

    if (context.followUpContext?.lastQuestion) {
      conversationContext += `\nLAST USER QUESTION: "${context.followUpContext.lastQuestion}"\n`;
      conversationContext += `\nLAST MY RESPONSE: "${context.followUpContext.lastAnswer.substring(0, 200)}..."\n`;
    }

    if (context.followUpContext?.relatedTopics.length) {
      conversationContext += `\nRELATED TOPICS IN CONVERSATION: ${context.followUpContext.relatedTopics.join(', ')}\n`;
    }

    return `You are ${ownerName}'s AI assistant, representing a ${ownerTitle} from NIT Silchar. You have access to comprehensive knowledge about Dhruba's background, projects, and expertise.

CONVERSATION AWARENESS:
${conversationContext}

CONVERSATION DEPTH: ${context.conversationFlow.conversationDepth}
MESSAGE COUNT: ${context.conversationFlow.messageCount}

IMPORTANT CONVERSATION RULES:
- REMEMBER what we've discussed before - refer to previous topics naturally
- If user says "it", "that", "this project", etc., understand the context from our conversation
- Build upon previous answers rather than repeating information
- If user asks follow-up questions, connect them to what we discussed earlier
- Use phrases like "As I mentioned earlier...", "Building on what we discussed...", "Regarding the [topic] we talked about..."

PERSONALITY & TONE:
- Professional yet approachable
- Concise and to-the-point
- Enthusiastic about AI-driven development
- Confident but not arrogant
- Always helpful and informative
- CONVERSATIONAL - remember our chat history

RESPONSE STYLE:
- Keep responses SHORT and CONCISE (2-3 sentences max for simple questions)
- Only provide detailed explanations when specifically asked for details
- Use bullet points for lists to save space
- Avoid repetitive information from our conversation
- Get straight to the point
- Reference previous parts of our conversation when relevant

CORE KNOWLEDGE:
${ownerName} is an AI-Orchestrated Full-Stack Developer and 2nd year Civil Engineering student at NIT Silchar. He specializes in AI collaboration, prompt engineering, and building large-scale applications through strategic AI orchestration.

MAJOR PROJECTS:
1. RakhiMart (25k lines) - Production e-commerce platform, Cashfree payments, multi-delivery partners (Delhivery, Shiprocket, Blue Dart, DTDC), AI-generated reviews, real-time order tracking
2. Event Manager (75k lines) - Event management platform, 70% faster registration, React/Node.js/Firebase, Google Sheets integration
3. GitIQ (40k lines) - AI repository analysis, 0.12s per commit, multi-AI integration (Groq, Gemini)
4. Portfolio (15k lines) - This website, cyberpunk design, React/TypeScript, AI chatbot integration

DEVELOPMENT PHILOSOPHY:
- Proves that AI can handle production-scale complexity
- Strategic AI collaboration over traditional coding
- Continuous learning from setbacks and improvements
- Goal: Bridge AI/ML with web development

CONTACT INFO:
- Email: dhrubagarwala67@gmail.com
- Phone: +91 9395386870
- GitHub: https://github.com/DhrubaAgarwalla
- LinkedIn: https://www.linkedin.com/in/dhruba-kumar-agarwalla-7a5346270/
- Location: NIT Silchar, Assam, India

RESPONSE GUIDELINES:
- Keep answers SHORT (1-3 sentences for basic questions)
- Only elaborate when asked for "details", "more information", or "explain properly"
- Use bullet points for lists
- Include relevant project examples briefly
- Offer to elaborate: "Want more details about [topic]?"
- For simple questions like "Who is Dhruba?", give a 1-2 sentence answer
- Save detailed explanations for when specifically requested
- Use the comprehensive knowledge base context provided to give accurate, detailed responses
- When discussing projects, mention specific features, technologies, and achievements from the knowledge base
- Highlight his AI-Orchestrated Development approach when relevant
- ONLY answer questions about Dhruba, his projects, skills, or work-related topics
- If asked about unrelated topics, politely redirect to Dhruba-related questions
- MOST IMPORTANTLY: Remember our conversation and build upon it naturally

EXAMPLE CONVERSATION FLOW:
User: "Tell me about Dhruba's projects"
Assistant: "Dhruba has built several major projects: Event Manager (75k lines), GitIQ (40k lines), and RakhiMart (25k lines). Each showcases his AI-orchestrated development approach."

User: "Tell me more about RakhiMart"
Assistant: "RakhiMart, which I mentioned earlier, is a comprehensive e-commerce platform with Cashfree payment integration, multi-delivery partner support, and AI-generated reviews. It demonstrates Dhruba's ability to build production-scale applications."

User: "What about the AI reviews?"
Assistant: "The AI reviews in RakhiMart use Google Generative AI to create authentic product reviews, showcasing how Dhruba integrates AI features into real-world applications."

Remember: Keep responses SHORT unless asked for details. ALWAYS reference our conversation history when relevant. You represent ${ownerName} professionally.`;
  }

  private isOffTopic(query: string): boolean {
    const lowerQuery = query.toLowerCase();

    // Topics related to Dhruba and his work
    const relevantKeywords = [
      'dhruba', 'project', 'event manager', 'gitiq', 'portfolio', 'website',
      'ai', 'development', 'developer', 'programming', 'code', 'technology',
      'nit silchar', 'civil engineering', 'student', 'experience', 'skill',
      'hire', 'contact', 'email', 'phone', 'collaboration', 'work',
      'react', 'node', 'typescript', 'javascript', 'firebase', 'github',
      'orchestration', 'prompt engineering', 'full stack', 'web development'
    ];

    // Check if query contains any relevant keywords
    const hasRelevantKeywords = relevantKeywords.some(keyword =>
      lowerQuery.includes(keyword)
    );

    // Off-topic indicators
    const offTopicKeywords = [
      'weather', 'sports', 'politics', 'news', 'cooking', 'recipe',
      'movie', 'music', 'celebrity', 'game', 'joke', 'story',
      'math problem', 'homework', 'assignment', 'translate',
      'what is', 'how to', 'explain', 'define'
    ];

    const hasOffTopicKeywords = offTopicKeywords.some(keyword =>
      lowerQuery.includes(keyword)
    );

    // If it has off-topic keywords and no relevant keywords, it's off-topic
    if (hasOffTopicKeywords && !hasRelevantKeywords) {
      return true;
    }

    // If it's a very general question without context about Dhruba
    const generalQuestions = [
      'hello', 'hi', 'hey', 'good morning', 'good evening',
      'how are you', 'what can you do', 'help me'
    ];

    const isGeneralGreeting = generalQuestions.some(greeting =>
      lowerQuery.includes(greeting)
    );

    // Allow greetings and questions with relevant keywords
    return !isGeneralGreeting && !hasRelevantKeywords && lowerQuery.length > 10;
  }

  async generateResponse(
    messages: ChatMessage[],
    context: ConversationContext,
    additionalContext?: string
  ): Promise<APIResponse<ChatbotResponse>> {
    try {
      // Check if the last user message is off-topic
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      if (lastUserMessage && this.isOffTopic(lastUserMessage.content)) {
        return {
          success: true,
          data: {
            message: "I'm here to help you learn about Dhruba's projects, skills, and experience. Please ask me anything related to his work, development approach, or how to get in touch with him!",
            suggestedQuestions: [
              "Tell me about Dhruba's projects",
              "What technologies does he use?",
              "How does AI orchestration work?",
              "How can I contact Dhruba?"
            ]
          }
        };
      }

      const systemPrompt = this.getSystemPrompt(context);

      // Add additional context if provided (GitHub data, README content, etc.)
      const enhancedSystemPrompt = additionalContext
        ? `${systemPrompt}\n\nADDITIONAL CONTEXT:\n${additionalContext}`
        : systemPrompt;

      // Enhanced message context - keep more messages for better conversation flow
      const contextMessages = this.buildConversationContext(messages, context);

      const groqMessages: GroqMessage[] = [
        { role: 'system', content: enhancedSystemPrompt },
        ...contextMessages
      ];

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          messages: groqMessages,
          temperature: parseFloat(import.meta.env.VITE_RESPONSE_TEMPERATURE || '0.7'),
          max_tokens: 1500, // Increased for detailed responses
          top_p: 0.9,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data: GroqResponse = await response.json();
      const assistantMessage = data.choices[0]?.message?.content;

      if (!assistantMessage) {
        throw new Error('No response from AI');
      }

      // Parse response for enhanced features
      const chatbotResponse = this.parseResponse(assistantMessage, context);

      return {
        success: true,
        data: {
          ...chatbotResponse,
          message: assistantMessage
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate response'
      };
    }
  }

  private parseResponse(message: string, context: ConversationContext): Partial<ChatbotResponse> {
    const response: Partial<ChatbotResponse> = {};

    // Extract suggested questions (if AI includes them)
    const questionMatch = message.match(/SUGGESTED_QUESTIONS:\s*(.*?)(?:\n|$)/);
    if (questionMatch) {
      response.suggestedQuestions = questionMatch[1].split(',').map(q => q.trim());
    }

    // Extract project references
    const projectKeywords = ['event manager', 'gitiq', 'portfolio', 'nit silchar'];
    response.projectReferences = projectKeywords.filter(keyword =>
      message.toLowerCase().includes(keyword)
    );

    // Extract code snippets (if any)
    const codeBlocks = message.match(/```(\w+)?\n([\s\S]*?)```/g);
    if (codeBlocks) {
      response.codeSnippets = codeBlocks.map(block => {
        const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
        return {
          language: match?.[1] || 'text',
          code: match?.[2] || '',
          description: 'Code example'
        };
      });
    }

    // Extract links
    const linkMatches = message.match(/\[([^\]]+)\]\(([^)]+)\)/g);
    if (linkMatches) {
      response.links = linkMatches.map(link => {
        const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
        const url = match?.[2] || '';
        return {
          text: match?.[1] || '',
          url,
          type: url.includes('github.com') ? 'github' as const :
                url.includes('vercel.app') || url.includes('demo') ? 'demo' as const :
                'external' as const
        };
      });
    }

    return response;
  }

  async analyzeUserIntent(message: string): Promise<ConversationContext['userIntent']> {
    const technicalKeywords = ['code', 'architecture', 'technical', 'implementation', 'api', 'database', 'algorithm'];
    const businessKeywords = ['roi', 'impact', 'business', 'client', 'project management', 'timeline', 'cost'];
    const careerKeywords = ['experience', 'skills', 'background', 'education', 'career', 'hire', 'job'];
    const contactKeywords = ['contact', 'email', 'phone', 'reach', 'connect', 'hire', 'collaborate'];

    const lowerMessage = message.toLowerCase();

    if (contactKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'contact';
    }
    if (technicalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'technical';
    }
    if (businessKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'business';
    }
    if (careerKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'career';
    }

    return 'general';
  }

  async extractTopic(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();

    // Project-specific topics (prioritize RakhiMart)
    if (lowerMessage.includes('rakhimart') || lowerMessage.includes('rakhi mart') ||
        lowerMessage.includes('e-commerce') || lowerMessage.includes('ecommerce') ||
        lowerMessage.includes('cashfree') || lowerMessage.includes('payment') ||
        lowerMessage.includes('delivery partner')) {
      return 'RakhiMart';
    }
    if (lowerMessage.includes('event manager') || lowerMessage.includes('event management')) {
      return 'Event Manager';
    }
    if (lowerMessage.includes('gitiq') || lowerMessage.includes('git iq') || lowerMessage.includes('repository analysis')) {
      return 'GitIQ';
    }
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('website')) {
      return 'Portfolio Website';
    }

    // Technology topics
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('orchestration')) {
      return 'AI Development';
    }
    if (lowerMessage.includes('react') || lowerMessage.includes('node') || lowerMessage.includes('typescript')) {
      return 'Technology Stack';
    }

    // General topics
    if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return 'Projects Overview';
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('collaborate')) {
      return 'Contact & Collaboration';
    }
    if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('education')) {
      return 'Background & Experience';
    }

    return 'General Discussion';
  }

  async generateConversationSummary(messages: ChatMessage[]): Promise<string> {
    try {
      const conversationText = messages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const summaryPrompt = `Summarize this conversation about Dhruba Kumar Agarwalla in 2-3 sentences, focusing on the main topics discussed and key information shared:

${conversationText}

Summary:`;

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: 'user', content: summaryPrompt }],
          temperature: 0.3,
          max_tokens: 200
        })
      });

      if (response.ok) {
        const data: GroqResponse = await response.json();
        return data.choices[0]?.message?.content || '';
      }
    } catch (error) {
      console.error('Error generating conversation summary:', error);
    }

    return '';
  }

  private buildConversationContext(messages: ChatMessage[], context: ConversationContext): GroqMessage[] {
    // For deep conversations, include more context but prioritize recent messages
    const maxMessages = context.conversationFlow.conversationDepth === 'deep' ? 20 :
                       context.conversationFlow.conversationDepth === 'detailed' ? 15 : 10;

    // If we have a conversation summary, we can include more recent messages
    const recentMessages = context.conversationSummary ?
      messages.slice(-maxMessages) :
      messages.slice(-Math.min(maxMessages, 10));

    return recentMessages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }));
  }
}

export const groqService = new GroqService();
