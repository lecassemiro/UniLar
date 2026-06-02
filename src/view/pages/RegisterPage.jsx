import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  submitListing,
  EMPTY_FORM,
} from "../../controller/RegisterController";
import { navigateTo } from "../../controller/NavigationController";
import { LISTING_TYPES } from "../../model/ListingModel";

export default function RegisterPage() {
  const { state, dispatch } = useApp();

  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = () => {
    const result = submitListing(dispatch, form, state.listings);

    if (result.success) {
      setSubmitted(true);
      setForm({ ...EMPTY_FORM });
      setErrors({});
    } else {
      setErrors(result.errors);
    }
  };

  const typeEmoji = {
    kitnet: "🏠",
    quarto: "🛏️",
    apartamento: "🏢",
    casa: "🏡",
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#F7F6FF" }}
      >
        <div className="bg-white rounded-3xl p-10 shadow-lg text-center max-w-md">
          <div className="text-7xl mb-4">🎉</div>

          <h1
            className="text-3xl font-bold mb-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "#26215C",
            }}
          >
            Imóvel publicado!
          </h1>

          <p className="text-gray-500 mb-8">
            Seu anúncio já está disponível para os estudantes.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setSubmitted(false)}
              className="flex-1 py-3 rounded-xl border-2 border-purple-600 text-purple-600 font-semibold"
            >
              Novo anúncio
            </button>

            <button
              onClick={() => navigateTo(dispatch, "listings")}
              className="flex-1 py-3 rounded-xl text-white font-semibold"
              style={{
                background:
                  "linear-gradient(135deg,#534AB7,#378ADD)",
              }}
            >
              Ver imóveis
            </button>
          </div>
        </div>
      </div>
    );
  }

  const Input = ({
    field,
    label,
    type = "text",
    placeholder,
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-2">
        {label}
      </label>

      <input
        type={type}
        value={form[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border outline-none transition-all"
        style={{
          borderColor: errors[field] ? "#ef4444" : "#E5E7EB",
        }}
      />

      {errors[field] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: "#F7F6FF" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "#26215C",
            }}
          >
            🏠 Anunciar Imóvel
          </h1>

          <p className="text-gray-500">
            Cadastre sua moradia e encontre estudantes
            interessados rapidamente.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm p-6">

              <h2
                className="font-bold text-lg mb-6"
                style={{
                  color: "#534AB7",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                📋 Dados do imóvel
              </h2>

              <div className="space-y-5">

                <Input
                  field="title"
                  label="Título"
                  placeholder="Ex: Kitnet mobiliada perto da USP"
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Tipo do imóvel
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      handleChange("type", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border"
                  >
                    {LISTING_TYPES.filter(
                      (t) => t.value !== "todos"
                    ).map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    field="city"
                    label="Cidade"
                    placeholder="São Paulo"
                  />

                  <Input
                    field="neighborhood"
                    label="Bairro"
                    placeholder="Butantã"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    field="price"
                    label="Preço"
                    type="number"
                    placeholder="750"
                  />

                  <Input
                    field="area"
                    label="Área"
                    type="number"
                    placeholder="30"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    field="rooms"
                    label="Quartos"
                    type="number"
                    placeholder="1"
                  />

                  <Input
                    field="baths"
                    label="Banheiros"
                    type="number"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Descrição
                  </label>

                  <textarea
                    rows="5"
                    value={form.desc}
                    onChange={(e) =>
                      handleChange("desc", e.target.value)
                    }
                    placeholder="Descreva seu imóvel..."
                    className="w-full px-4 py-3 rounded-xl border resize-none"
                  />

                  {errors.desc && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.desc}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Comodidades
                  </label>

                  <input
                    value={form.amenities}
                    onChange={(e) =>
                      handleChange(
                        "amenities",
                        e.target.value
                      )
                    }
                    placeholder="Wi-Fi, Mobiliado, Garagem..."
                    className="w-full px-4 py-3 rounded-xl border"
                  />
                </div>

                <Input
                  field="contact"
                  label="Telefone / WhatsApp"
                  placeholder="(11) 99999-9999"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-2xl text-white font-bold transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg,#534AB7,#378ADD)",
                  }}
                >
                  🚀 Publicar anúncio
                </button>
              </div>
            </div>
          </div>

          {/* PREVIEW */}
          <div>
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden sticky top-6">

              <div
                className="h-48 flex items-center justify-center text-7xl"
                style={{
                  background:
                    "linear-gradient(135deg,#534AB720,#378ADD20)",
                }}
              >
                {typeEmoji[form.type]}
              </div>

              <div className="p-6">

                <h3
                  className="font-bold text-xl mb-2"
                  style={{
                    color: "#26215C",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {form.title || "Título do anúncio"}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  📍 {form.neighborhood || "Bairro"},{" "}
                  {form.city || "Cidade"}
                </p>

                <div className="flex gap-4 text-sm text-gray-500 mb-4">
                  <span>🛏 {form.rooms || 0}</span>
                  <span>🚿 {form.baths || 0}</span>
                  <span>📐 {form.area || 0}m²</span>
                </div>

                <div
                  className="text-3xl font-bold mb-4"
                  style={{
                    color: "#534AB7",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  R$ {form.price || 0}
                </div>

                <div className="bg-purple-50 rounded-xl p-4 text-sm text-gray-600">
                  {form.desc ||
                    "A descrição aparecerá aqui conforme você digita."}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}