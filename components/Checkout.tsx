
import React, { useMemo, useState } from 'react';
import { CartItem } from '../types';


interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    note: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);



  const subtotal = items.reduce((sum, item) => {
    return sum + (item.selectedOption ? item.selectedOption.price : item.price);
  }, 0);

  const cartSummary = useMemo(() => {
    if (!items.length) return 'Aucun service sélectionné';
    return items
      .map((item, idx) => {
        const optionLabel = item.selectedOption ? ` - ${item.selectedOption.label}` : '';
        const price = item.selectedOption ? item.selectedOption.price : item.price;
        return `${idx + 1}. ${item.name}${optionLabel} : ${price}€`;
      })
      .join('\n');
  }, [items]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const remainingSlots = 8 - photos.length;

      if (remainingSlots <= 0) {
        setError('Maximum 8 photos autorisées.');
        return;
      }

      const filesToAdd = selectedFiles.slice(0, remainingSlots);
      const newPhotos = filesToAdd.map((file: File) => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      setPhotos(prev => [...prev, ...newPhotos]);
      setError(null);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const newPhotos = [...prev];
      URL.revokeObjectURL(newPhotos[index].preview);
      newPhotos.splice(index, 1);
      return newPhotos;
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.phone) {
      setError('Merci de renseigner un numéro de téléphone.');
      return;
    }


    // Validation removed for EmailJS keys

    setSending(true);

    try {
      const photoData = await Promise.all(photos.map(p => fileToBase64(p.file)));

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          cartSummary,
          total: `${subtotal}€`,
          itemsCount: items.length,
          items, // Pass the full items array for better email templating
          photos: photoData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Email send failed', err);
      setError("Échec de l'envoi. Vérifiez la configuration ou réessayez.");
    } finally {
      setSending(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 bg-white animate-fade-in flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">Demande envoyée !</h1>
            <p className="text-slate-500 leading-relaxed">
              Merci <strong>{form.firstName}</strong> ! Votre demande de rendez-vous a bien été transmise.
              {form.preferredDate && (
                <span className="block mt-2">Nous avons noté votre préférence pour le <strong>{form.preferredDate}</strong> à <strong>{form.preferredTime || 'convenir'}</strong>.</span>
              )}
              Nous vous recontacterons sous 24h au <span className="text-blue-600 font-bold">{form.phone}</span>.
            </p>
          </div>
          <button
            onClick={onBack}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all mb-10"
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          Continuer mes achats
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-3">Finaliser ma demande</h1>
                <p className="text-slate-500">Précisez vos coordonnées pour recevoir votre devis gratuit.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Vos Coordonnées</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Prénom</label>
                      <input
                        type="text"
                        placeholder="Jean"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        value={form.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nom</label>
                      <input
                        type="text"
                        placeholder="Dupont"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        value={form.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Téléphone</label>
                      <input
                        type="tel"
                        placeholder="+32 4XX XX XX XX"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email (Optionnel)</label>
                      <input
                        type="email"
                        placeholder="jean@exemple.be"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Adresse d'intervention</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Adresse complète</label>
                      <input
                        type="text"
                        placeholder="Rue de l'intervention, n°"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        value={form.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Code Postal</label>
                        <input
                          type="text"
                          placeholder="4000"
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                          value={form.postalCode}
                          onChange={(e) => handleChange('postalCode', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Ville</label>
                        <input
                          type="text"
                          placeholder="Liège"
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                          value={form.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Détails (Optionnel)</label>
                      <textarea
                        placeholder="Étage, code porte, horaires préférés..."
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all min-h-[120px] resize-none"
                        value={form.note}
                        onChange={(e) => handleChange('note', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Appointment */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Date & Heure souhaitées</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Date idéale</label>
                      <input
                        type="date"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        value={form.preferredDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => handleChange('preferredDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Heure idéale</label>
                      <div className="flex gap-2">
                        <select
                          className="flex-1 bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                          value={form.preferredTime.split(':')[0] || ''}
                          onChange={(e) => {
                            const minutes = form.preferredTime.split(':')[1] || '00';
                            handleChange('preferredTime', `${e.target.value}:${minutes}`);
                          }}
                        >
                          <option value="">Heure</option>
                          {Array.from({ length: 15 }, (_, i) => i + 8).map(h => (
                            <option key={h} value={h.toString().padStart(2, '0')}>{h}h</option>
                          ))}
                        </select>
                        <select
                          className="flex-1 bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                          value={form.preferredTime.split(':')[1] || ''}
                          onChange={(e) => {
                            const hours = form.preferredTime.split(':')[0] || '08';
                            handleChange('preferredTime', `${hours}:${e.target.value}`);
                          }}
                        >
                          <option value="">Min</option>
                          <option value="00">00</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                          <option value="45">45</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Photos */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Photos (Optionnel)</h2>
                  </div>

                  <p className="text-sm text-slate-500 ml-12">
                    Ajoutez jusqu'à 8 photos pour nous aider à mieux évaluer votre demande.
                  </p>

                  <div className="ml-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                        <img src={photo.preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {photos.length < 8 && (
                      <label className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-400 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Ajouter</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    className="w-full py-5 bg-blue-600 text-white rounded-2xl uppercase tracking-[0.2em] text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : 'Envoyer ma demande'}
                  </button>
                  {error && <p className="text-sm font-medium text-red-500 mt-4 text-center">{error}</p>}
                  <p className="text-[10px] text-slate-400 mt-6 text-center leading-relaxed">
                    En validant, vous acceptez que DETAILWAVE traite vos données pour vous recontacter.
                    Aucun paiement ne vous est demandé à cette étape.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center justify-between">
                  Votre Panier
                  <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold">{items.length} services</span>
                </h2>

                {items.length === 0 ? (
                  <div className="text-center py-10 space-y-4">
                    <p className="text-slate-400 italic">Votre panier est vide.</p>
                    <button onClick={onBack} className="text-blue-600 text-sm font-bold">Ajouter des services</button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden relative flex-shrink-0 border border-slate-100">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 text-sm truncate">{item.name}</h3>
                          {item.selectedOption ? (
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-1.5 bg-blue-50 w-fit px-2 py-1 rounded">
                              {item.selectedOption.label}
                            </p>
                          ) : (
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">{item.category}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-900">
                            {item.selectedOption ? item.selectedOption.price : item.price}€
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-slate-100 pt-6 space-y-3">
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Sous-total</span>
                        <span className="text-slate-900 font-medium">{subtotal}€</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Déplacement (Liège)</span>
                        <span className="text-green-600 font-bold">OFFERT</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                      <span className="font-bold text-slate-900">Total estimé</span>
                      <span className="text-2xl font-bold text-blue-600">{subtotal}€</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-600 p-8 rounded-[2rem] text-white space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Prochaines étapes
                </h3>
                <ul className="text-sm text-blue-100 space-y-3">
                  <li className="flex gap-2">
                    <span className="font-bold text-white">•</span>
                    Réception de votre demande
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-white">•</span>
                    Appel de confirmation sous 24h
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-white">•</span>
                    Fixation du rendez-vous
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

