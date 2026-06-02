// ============================================================
// VIEW/PAGE — ProfilePage.jsx
// ============================================================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ACTIONS } from "../../context/AppContext";
import { saveProfile, validateProfile } from "../../model/UserModel";
import { navigateTo } from "../../controller/NavigationController";

export default function ProfilePage() {
  const { state, dispatch } = useApp();
  const { profile, favorites, userListings } = state;

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSave = () => {
    const errs = validateProfile(form);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    saveProfile(form);

    dispatch({
      type: ACTIONS.UPDATE_PROFILE,
      payload: form,
    });

    dispatch({
      type: ACTIONS.SHOW_TOAST,
      payload: {
        message: "Perfil atualizado com sucesso! ✅",
        type: "success",
      },
    });

    setEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setForm(profile);
    setErrors({});
    setEditing(false);
  };

  const STATS = [
    {
      icon: "❤️",
      value: favorites.length,
      label: "Favoritos",
    },
    {
      icon: "🏠",
      value: userListings.length,
      label: "Anúncios",
    },
    {
      icon: "📅",
      value: profile.memberSince,
      label: "Membro desde",
    },
  ];

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "#F7F6FF" }}
    >
      <div className="max-w-xl mx-auto">

        {/* Título */}
        <h1
          className="text-3xl font-extrabold mb-8"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "#26215C",
          }}
        >
          👤 Meu Perfil
        </h1>

        {/* Card principal */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm mb-6">

          {/* Banner */}
          <div
            className="h-32"
            style={{
              background:
                "linear-gradient(135deg,#26215C,#534AB7,#378ADD)",
            }}
          />

          {/* Conteúdo */}
          <div className="px-6 pb-8">

            {/* Avatar */}
            <div className="flex flex-col items-center -mt-14 mb-6">

              <div
                className="w-28 h-28 rounded-full flex items-center justify-center text-6xl border-4 border-white shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg,#534AB7,#378ADD)",
                }}
              >
                🎓
              </div>

              {profile.verified && (
                <span
                  className="mt-3 px-4 py-2 rounded-full text-xs font-semibold text-white shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg,#22c55e,#16a34a)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  ✅ Universitário Verificado
                </span>
              )}
            </div>

            {!editing ? (
              <div className="text-center">

                <h2
                  className="text-3xl font-extrabold mb-2"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: "#26215C",
                  }}
                >
                  {profile.name}
                </h2>

                <p
                  className="text-gray-500 mb-1"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {profile.course} • {profile.semester}
                </p>

                <p
                  className="text-purple-600 font-medium mb-3"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  🏛️ {profile.university}
                </p>

                <p
                  className="text-gray-500 mb-5"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  📍 {profile.city}
                </p>

                <div
                  className="rounded-2xl p-4 border mb-6"
                  style={{
                    background: "#F7F6FF",
                    borderColor: "#ECE9FF",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {profile.bio}
                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg,#534AB7,#378ADD)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  ✏️ Editar Perfil
                </button>
              </div>
            ) : (
              <div className="space-y-4">

                {[
                  {
                    key: "name",
                    label: "Nome",
                  },
                  {
                    key: "university",
                    label: "Universidade",
                  },
                  {
                    key: "course",
                    label: "Curso",
                  },
                  {
                    key: "semester",
                    label: "Semestre",
                  },
                  {
                    key: "city",
                    label: "Cidade",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm mb-1 font-medium">
                      {field.label}
                    </label>

                    <input
                      type="text"
                      value={form[field.key] || ""}
                      onChange={(e) =>
                        handleChange(field.key, e.target.value)
                      }
                      className="w-full border rounded-xl px-4 py-3"
                    />

                    {errors[field.key] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.key]}
                      </p>
                    )}
                  </div>
                ))}

                <textarea
                  rows={4}
                  value={form.bio || ""}
                  onChange={(e) =>
                    handleChange("bio", e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                  placeholder="Fale um pouco sobre você..."
                />

                <div className="flex gap-3">

                  <button
                    onClick={handleSave}
                    className="flex-1 py-3 rounded-xl text-white font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg,#534AB7,#378ADD)",
                    }}
                  >
                    Salvar
                  </button>

                  <button
                    onClick={handleCancel}
                    className="px-5 py-3 rounded-xl border"
                  >
                    Cancelar
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          {STATS.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">
                {item.icon}
              </div>

              <div
                className="text-2xl font-extrabold mb-1"
                style={{
                  color: "#534AB7",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {item.value}
              </div>

              <div
                className="text-sm text-gray-400"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Ações rápidas */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3
            className="text-lg font-bold mb-4"
            style={{
              color: "#26215C",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            Ações rápidas
          </h3>

          <div className="grid gap-3">

            {[
              {
                icon: "🔍",
                label: "Buscar imóveis",
                page: "listings",
              },
              {
                icon: "❤️",
                label: "Meus favoritos",
                page: "favorites",
              },
              {
                icon: "➕",
                label: "Anunciar imóvel",
                page: "register",
              },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() =>
                  navigateTo(dispatch, item.page)
                }
                className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-purple-100 hover:bg-purple-50 transition-all"
              >
                <span className="text-xl">
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.label}
                </span>

                <span className="ml-auto text-gray-300">
                  →
                </span>
              </button>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}