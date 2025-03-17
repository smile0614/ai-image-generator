import fetch from 'node-fetch';
import FormData from 'form-data';

const IMAGE_GENERATION_API_URL = process.env.IMAGE_GENERATION_API_URL!;
const WEBHOOK_URL = process.env.WEBHOOK_URL!;
const IMAGE_API_KEY = process.env.IMAGE_API_KEY!;

export interface ImageFormFields {
    image?: Buffer; 
    // imageName: string;
    // imageType: string;
    prompt: string;
    negprompt: string;
    resolution: string;
    loras: string;
    type_gen: string;
    type_user: string;
    id_gen: string;
}

export async function submitImageForm(fields: ImageFormFields): Promise<any> {
  const form = new FormData();

  form.append('api_key', IMAGE_API_KEY);
  if (fields.image) {
    form.append('image', fields.image);
  }
  form.append('prompt', fields.prompt);
  form.append('negprompt', fields.negprompt);
  form.append('resolution', fields.resolution);
  form.append('loras', fields.loras);
  form.append('type_gen', fields.type_gen);
  form.append('type_user', fields.type_user);
  form.append('id_gen', fields.id_gen);
  form.append('webhook', WEBHOOK_URL);

  try {
    // console.log('clo gen URL', IMAGE_GENERATION_API_URL);
    // console.log('clo gen body', form);

    // console.log("img2instant Request form", form);
    const response = await fetch(IMAGE_GENERATION_API_URL, {
      method: 'POST',
      body: form,
      headers: {
        'api_key': IMAGE_API_KEY
      },
      // Optionally add headers if required by the API
    });
    // console.log('response FUNCTION IMAGE', response);
    // console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    if (!response.ok) {
        // Attempt to parse the response body for more details
        const responseBody = await response.text();  // Use .json() if response is in JSON format
        console.error('Server error response body:', responseBody);
        throw new Error(`Server responded with status: ${response.status} - ${responseBody}`);
    }

    return await response.json();

} catch (error) {
    console.error('Error submitting image form:', error);
    throw error;
  }
}