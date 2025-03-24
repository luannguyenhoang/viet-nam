import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'error' });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/am-thuc`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ 
      message: "Có lỗi",
      error: error instanceof Error ? error.message : 'error'
    });
  }
}
