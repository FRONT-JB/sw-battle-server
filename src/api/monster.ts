import axios from 'axios';
import { BASE_URL } from './common';

export const findMonster = async (name: string) => {
  const decoderName = decodeURIComponent(name).toLowerCase();
  const url = `${BASE_URL}/monsters/?name=${decoderName}`;
  return await axios.get(url);
};
