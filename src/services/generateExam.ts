import config from 'src/config';
import { BASE_URL } from 'src/services/api';
import Question from 'src/types/Question';
import getToken from './getToken';

const generateExam = async (id: number, mode: string): Promise<Question[] | null> => {
  if (config.mandatoryAuthModes.includes(mode)) {
    const token = await getToken();
    if (!token) return null;
    const res = await fetch(BASE_URL + `/exams/generate/${id}?mode=${mode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (res.status !== 200) return null;
    const exam = await res.json();
    return exam;
  }

  const res = await fetch(BASE_URL + `/exams/generate/${id}?mode=${mode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.status !== 200) return null;

  const exam = await res.json();
  return exam;
};

export default generateExam;
