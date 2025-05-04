import axios from "axios";

export interface ResearchPaper {
  title: string;
  abstract: string;
  link: string;
}

export interface ResearchResponse {
  query: string;
  response: string;
  papers: ResearchPaper[];
}

const API_URL = "http://127.0.0.1:5000/api";

export const researchApi = {
  search: async (query: string): Promise<ResearchResponse> => {
    const response = await axios.post(`${API_URL}/research`, {
      query,
    });
    return response.data;
  },
};
