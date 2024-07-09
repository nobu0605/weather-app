import axios from "axios";

export default async function (req, res): Promise<void> {
  const { targetUrl, method } = req.body;

  if (method === "POST") {
    const result: any = await axios
      .post(targetUrl + `&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`)
      .catch((e) => {
        console.error(e);
      });
    const data = result.data;
    res.status(200).json(data);
  }

  if (method === "GET") {
    const result: any = await axios
      .get(targetUrl + `&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`)
      .catch((e) => {
        console.error(e);
      });
    const data = result.data;
    res.status(200).json(data);
  }

  res.status(404).json({ message: "Not Found" });
}
