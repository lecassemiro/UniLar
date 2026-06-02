import { useApp } from "../../context/AppContext";
import { closeListingModal } from "../../controller/ListingController";

export default function PropertyModal() {
  const { state, dispatch } = useApp();

  if (!state.isModalOpen || !state.selectedListing) {
    return null;
  }

  const listing = state.selectedListing;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => closeListingModal(dispatch)}
    >
      <div
        className="bg-white rounded-3xl p-6 max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-2">
          {listing.title}
        </h2>

        <p className="text-gray-500 mb-4">
          📍 {listing.neighborhood}, {listing.city}
        </p>

        <div className="text-lg font-bold text-purple-700 mb-4">
          R$ {listing.price.toLocaleString("pt-BR")}/mês
        </div>

        <p className="mb-4">
          {listing.desc}
        </p>

        <div className="mb-4">
          <strong>Comodidades:</strong>

          <ul className="list-disc ml-5 mt-2">
            {listing.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <strong>Contato:</strong> {listing.contact}
        </div>

        <button
          onClick={() => closeListingModal(dispatch)}
          className="bg-purple-700 text-white px-4 py-2 rounded-xl"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}