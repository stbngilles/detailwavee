/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const PRODUCTS: Product[] = [
    {
        id: 's1',
        name: 'Nettoyage Canapé',
        tagline: 'Redonnez vie à votre salon.',
        description: 'Élimination des taches tenaces, neutralisation des odeurs et désinfection complète par injection-extraction.',
        longDescription: 'Notre service de nettoyage de canapé à domicile utilise des techniques professionnelles pour traiter la microfibre, le velours, le coton et le lin. Nous éliminons les taches de café, de graisse, d\'urine et neutralisons les mauvaises odeurs. Le résultat est visible immédiatement et le séchage est rapide.',
        price: 40,
        priceList: [
            { label: 'Fauteuil', price: 40 },
            { label: 'Canapé 2/3 places', price: 60 },
            { label: 'Canapé 4/5 places', price: 70 },
            { label: 'Canapé en U', price: 80 },
            { label: 'Pouf', price: 19 },
            { label: 'Lot de chaises (4-6)', price: 50 }
        ],
        category: 'Textile',
        imageUrl: '/Photo/Canap%C3%A9.jpg',
        gallery: [
            '/Photo/Canap%C3%A9.jpg',
            '/Photo/Tache.png'
        ],
        features: ['Détachage profond', 'Désinfection', 'Anti-odeurs', 'Séchage rapide']
    },
    {
        id: 's2',
        name: 'Nettoyage Matelas',
        tagline: 'Dormez sur vos deux oreilles.',
        description: 'Désinfection totale anti-acariens, élimination des traces de transpiration et d\'urine pour une hygiène parfaite.',
        longDescription: 'Nous passons un tiers de notre vie sur notre matelas. Notre nettoyage en profondeur élimine les acariens, les bactéries, les moisissures invisibles et les allergènes. Idéal pour les personnes allergiques ou pour simplement retrouver une literie saine et fraîche. Produits écologiques et non toxiques.',
        price: 40,
        priceList: [
            { label: 'Matelas Enfant', price: 40 },
            { label: 'Matelas 1 place', price: 50 },
            { label: 'Matelas 2 places', price: 60 }
        ],
        category: 'Textile',
        imageUrl: '/Photo/matelas.webp',
        gallery: [
            '/Photo/matelas.webp',
            '/Photo/Tache.png'
        ],
        features: ['Anti-acariens', 'Élimination auréoles', 'Hypoallergénique']
    },
    {
        id: 's3',
        name: 'Lavage Auto (Intérieur)',
        tagline: 'Comme au premier jour.',
        description: 'Lavage intérieur complet à domicile. Shampoing des sièges, nettoyage des plastiques et vitres.',
        longDescription: 'Nous intervenons sur votre lieu de travail ou à domicile pour un nettoyage intérieur méticuleux. De la citadine à l\'utilitaire, nous traitons les plastiques, aspirons en profondeur et rénovons vos sièges (tissu ou cuir) par injection-extraction ou vapeur.',
        price: 50,
        priceList: [
            { label: 'Formule Éco (Aspiration + Plastiques)', price: 50 },
            { label: 'Formule Premium (Shampoing sièges inclus)', price: 70 }
        ],
        category: 'Auto',
        imageUrl: '/Photo/Voiture.webp',
        gallery: [
            '/Photo/Voiture.webp',
            '/Photo/shampouineuse%20vs%20nettoyeur%20vapeur.jpg'
        ],
        features: ['Shampoing sièges', 'Nettoyage plastiques', 'Sans eau', 'Désinfection habitacle']
    },
    {
        id: 's4',
        name: 'Nettoyage Tapis',
        tagline: 'Ravivez les couleurs.',
        description: 'Décrassage en profondeur des fibres, qu\'elles soient synthétiques, laine ou tapis d\'Orient.',
        longDescription: 'Les tapis sont de véritables nids à poussière et allergènes. Notre matériel haut de gamme permet d\'extraire la saleté incrustée au cœur des fibres sans les abîmer. Nous traitons les mauvaises odeurs (animaux, tabac) et redonnons de l\'éclat aux couleurs.',
        price: 50,
        priceList: [
            { label: '1 Tapis', price: 50 },
            { label: '2 Tapis', price: 80 },
            { label: '3 Tapis', price: 100 }
        ],
        category: 'Textile',
        imageUrl: '/Photo/Tapis.avif',
        gallery: [
            '/Photo/Tapis.avif',
            '/Photo/matelas.webp'
        ],
        features: ['Fibres naturelles', 'Fibres synthétiques', 'Séchage contrôlé']
    }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "Pourquoi nettoyer ses textiles ?",
        date: "Conseils d'expert",
        excerpt: "Au-delà de l'esthétique, c'est une question de santé pour votre foyer.",
        image: "/Photo/PourquoiLaver.webp",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-slate-600" },
                "Les canapés et matelas sont les objets les plus utilisés de la maison, mais souvent les moins nettoyés. La poussière, les peaux mortes et l'humidité créent un environnement idéal pour les acariens."
            ),
            React.createElement("p", { className: "mb-8 text-slate-600" },
                "Une aspiration simple ne suffit pas. L'injection-extraction permet de descendre plusieurs centimètres dans la fibre pour retirer ce qui est invisible à l'œil nu."
            ),
            React.createElement("blockquote", { className: "border-l-4 border-blue-500 pl-6 italic text-xl text-slate-800 my-10 font-serif" },
                "\"Un air intérieur sain commence par des textiles propres.\""
            ),
            React.createElement("p", { className: "mb-6 text-slate-600" },
                "Chez DetailWave, nous utilisons des produits biodégradables qui garantissent la sécurité de vos enfants et de vos animaux de compagnie, tout en étant impitoyables avec la saleté."
            )
        )
    },
    {
        id: 2,
        title: "Taches tenaces : Que faire ?",
        date: "Astuces",
        excerpt: "Café, vin, urine... n'aggravez pas la situation avec des remèdes de grand-mère inadaptés.",
        image: "/Photo/Tache.png",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-slate-600" },
                "Le premier réflexe est souvent de frotter. Erreur ! Frotter incruste la tache et abîme la fibre. Il faut toujours tamponner avec un chiffon propre et sec."
            ),
            React.createElement("p", { className: "mb-8 text-slate-600" },
                "Attention aux auréoles : nettoyer juste la tache sur un canapé sale va créer une zone propre qui ressortira comme une tache claire. C'est pourquoi nous préconisons toujours un nettoyage intégral de l'assise."
            ),
            React.createElement("blockquote", { className: "border-l-4 border-blue-500 pl-6 italic text-xl text-slate-800 my-10 font-serif" },
                "\"La rapidité d'intervention est la clé pour sauver vos textiles préférés.\""
            ),
            React.createElement("div", { className: "my-12 p-8 bg-blue-50 text-blue-900 font-medium rounded-lg" },
                React.createElement("h4", { className: "font-bold mb-2" }, "La Règle d'Or :"),
                React.createElement("p", null, "Si vous ne savez pas quel produit utiliser, utilisez de l'eau tiède et appelez un professionnel. Les produits chimiques de supermarché peuvent fixer la couleur de la tache définitivement.")
            )
        )
    }
];

export const BRAND_NAME = 'DETAILWAVE';
export const PRIMARY_COLOR = 'slate-900';
export const ACCENT_COLOR = 'blue-600';
