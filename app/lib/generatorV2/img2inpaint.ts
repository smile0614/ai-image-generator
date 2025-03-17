import fetch from 'node-fetch';
import FormData from 'form-data';
import { fetchWithRetry } from './fetchWithRetry';

const IMAGE_GENERATION_API_URL_V2 = process.env.IMAGE_GENERATION_API_URL_V2!;
const WEBHOOK_URL = process.env.WEBHOOK_URL!;
const IMAGE_API_KEY = process.env.IMAGE_API_KEY!;

export interface InpaintFormFields {
    image?: Buffer; 
    mask?: Buffer;
    facelock?: Buffer;
    pose?: Buffer;
    params: string;
    type_gen: string;
    type_user: string;
    id_gen: string;
}

export async function submitInpaintForm(fields: InpaintFormFields): Promise<any> {
  const form = new FormData();

  form.append('api_key', IMAGE_API_KEY);

  if (fields.image) {
    form.append('image', fields.image);
  }
  if (fields.mask) {
    form.append('mask', fields.mask);
  }
  if (fields.facelock) {
    form.append('facelock', fields.facelock);
  }
  // if (fields.image) {
  //   form.append('facelock', fields.image);
  // }
  if (fields.pose) {
    form.append('pose', fields.pose);
  }

  form.append('params', fields.params);
  form.append('type_gen', "img2inpaint");
  form.append('type_user', fields.type_user);
  form.append('id_gen', fields.id_gen);
  form.append('webhook', WEBHOOK_URL);

    // console.log('clo gen URL', IMAGE_GENERATION_API_URL_V2);
    // console.log('clo gen body', form);

    // console.log("img2instant Request form", form);

    // const response = await fetchWithRetry(IMAGE_GENERATION_API_URL_V2, {
    //   method: 'POST',
    //   body: form,
    //   headers: {
    //     'api_key': IMAGE_API_KEY,
    //   },
    // });
    
    try {
      const response = await fetchWithRetry(IMAGE_GENERATION_API_URL_V2, {
        method: 'POST',
        body: form,
        headers: {
          'api_key': IMAGE_API_KEY,
        },
      });
  
      return await response.json();
    } catch (error) {
      console.error('Error submitting image form:', error);
      throw error;
    }
  }
    
    // console.log('response FUNCTION IMAGE', response);
    // console.log('Response status:', response.status);

    // if (!response.ok) {
    //   throw new Error(`Server responded with status: ${response.status}`);
    // }

    // if (!response.ok) {
    //     // Attempt to parse the response body for more details
    //     const responseBody = await response.text();  // Use .json() if response is in JSON format
    //     console.error('Server error response body:', responseBody);
    //     throw new Error(`Server responded with status: ${response.status} - ${responseBody}`);
    // }

    // return await response.json();
