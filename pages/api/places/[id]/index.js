import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }
  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
    return;
  }

  if (request.method === "PATCH") {
    await Place.findByIdAndUpdate(id, { $set: request.body });
    response.status(200).json({ status: "place updated" });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "place deleted!" });
  }
}
