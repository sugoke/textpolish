import { HTTP } from 'meteor/http';

const apiKey = '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'; // Replace with your OpenAI API key

Meteor.methods({
  enhanceText(text, language) {
    const engine = getEngineByLanguage(language);
    const apiUrl = `https://api.openai.com/v1/engines/${engine}/completions`;

    const response = HTTP.post(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      data: {
        prompt: text,
        max_tokens: 100,
        temperature: 0.7,
        n: 1,
      },
    });

    if (response.statusCode === 200) {
      const enhancedText = response.data.choices[0].text.trim();
      return enhancedText;
    } else {
      throw new Meteor.Error('api-call-failed', 'Failed to call the OpenAI API');
    }
  },
});

function getEngineByLanguage(language) {
  // Add more language-engine mappings as needed
  switch (language) {
    case 'en':
      return 'davinci-codex';
    case 'es':
      return 'davinci';
    case 'fr':
      return 'davinci';
    default:
      throw new Meteor.Error('unsupported-language', 'Unsupported language');
  }
}
