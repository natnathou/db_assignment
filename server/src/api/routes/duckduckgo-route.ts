import express, { Response, Request, json, Router } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { SearchResult } from '../../models/ApiDuckduckgoState';

const router = express();

router.get('/duckduckgo', async (req: Request, res: Response) => {
  try {
    const query = req.query as { q: string };
    const config: AxiosRequestConfig = {
      params: { q: query.q, format: 'json' },
    };
    const response = await axios.get<{ RelatedTopics: SearchResult[] }>(
      `https://api.duckduckgo.com/`,
      config
    );

    let responseFiltered: SearchResult[] = response?.data?.RelatedTopics?.filter(
      (x) => x?.FirstURL?.length > 0 && x?.Text?.length > 0
    );

    res.status(200).json({ response: responseFiltered, error: false });
  } catch (e) {
    res.status(500).json({ error: true });
  }
});

export default router;
