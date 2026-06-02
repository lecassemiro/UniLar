// ============================================================
// VIEW/PAGE — ProfilePage.jsx
// ============================================================

import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { ACTIONS } from "../../context/AppContext"
import { saveProfile, validateProfile } from "../../model/UserModel"
import { navigateTo } from "../../controller/NavigationController"
import {
  UserRound,
  PencilLine,
  Save,
  X,
  BadgeCheck,
  Heart,
  Home,
  CalendarDays,
  MapPin,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Search,
} from "lucide-react"

export default function ProfilePage() {
  const { state, dispatch } = useApp()
  const { profile, favorites, userListings } = state

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...profile })
  const [errors, setErrors] = useState({})

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }))
    }
  }

  const handleSave = () => {
    const errs = validateProfile(form)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    saveProfile(form)

    dispatch({ type: ACTIONS.UPDATE_PROFILE, payload: form })
    dispatch({
      type: ACTIONS.SHOW_TOAST,
      payload: { message: "Perfil atualizado com sucesso!", type: "success" },
    })

    setEditing(false)
    setErrors({})
  }

  const handleCancel = () => {
    setForm(profile)
    setErrors({})
    setEditing(false)
  }

  const STATS = [
    { icon: Heart, value: favorites.length, label: "Favoritos" },
    { icon: Home, value: userListings.length, label: "Anúncios" },
    { icon: CalendarDays, value: profile.memberSince, label: "Membro desde" },
  ]

  const fields = [
    { key: "name", label: "Nome" },
    { key: "university", label: "Universidade" },
    { key: "course", label: "Curso" },
    { key: "semester", label: "Semestre" },
    { key: "city", label: "Cidade" },
  ]

  return (
    <div className="page-container space-y-6 py-8 sm:py-12">
      <section className="section-card overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600" />
        <div className="px-6 pb-6 sm:px-8">
          <div className="-mt-14 flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-[0_18px_40px_rgba(37,99,235,0.22)]">
              <UserRound size={46} strokeWidth={1.8} />
            </div>

            {profile.verified && (
              <span className="pill mt-4 bg-emerald-50 text-emerald-700">
                <BadgeCheck size={14} />
                Universitário verificado
              </span>
            )}

            {!editing ? (
              <div className="mt-6 space-y-5">
                <div>
                  <h1 className="font-display text-3xl font-bold text-slate-950 sm:text-4xl">
                    {profile.name}
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    {profile.course} • {profile.semester}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-sky-700">
                    <GraduationCap size={14} />
                    {profile.university}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={14} className="text-sky-600" />
                    {profile.city}
                  </p>
                </div>

                <div className="surface p-5 text-left text-sm leading-7 text-slate-600">
                  {profile.bio}
                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="button-primary"
                >
                  <PencilLine size={16} />
                  Editar perfil
                </button>
              </div>
            ) : (
              <div className="mt-6 w-full space-y-4 text-left">
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={form[field.key] || ""}
                        onChange={(e) =>
                          handleChange(field.key, e.target.value)
                        }
                        className="input-shell"
                      />
                      {errors[field.key] && (
                        <p className="text-xs text-rose-600">
                          {errors[field.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={form.bio || ""}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    className="input-shell resize-none"
                    placeholder="Fale um pouco sobre você..."
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleSave}
                    className="button-primary flex-1"
                  >
                    <Save size={16} />
                    Salvar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="button-secondary flex-1"
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {STATS.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="section-card-soft p-5">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-sm font-medium">{item.label}</span>
                <Icon size={18} className="text-sky-600" />
              </div>
              <div className="mt-4 font-display text-3xl font-bold text-slate-950">
                {item.value}
              </div>
            </div>
          )
        })}
      </section>

      <section className="section-card p-6 sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          <Sparkles size={14} />
          Ações rápidas
        </div>

        <div className="mt-5 grid gap-3">
          {[
            { icon: Search, label: "Buscar imóveis", page: "listings" },
            { icon: Heart, label: "Meus favoritos", page: "favorites" },
            { icon: Home, label: "Anunciar imóvel", page: "register" },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.page}
                onClick={() => navigateTo(dispatch, item.page)}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left transition-all hover:border-sky-200 hover:bg-sky-50/60"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                  <Icon size={18} />
                </span>
                <span className="font-medium text-slate-900">{item.label}</span>
                <ArrowRight size={16} className="ml-auto text-slate-400" />
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
