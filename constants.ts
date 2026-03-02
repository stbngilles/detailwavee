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
        price: 90,
        priceList: [
            { label: '3 places', price: 90 },
            { label: '4 places', price: 120 },
            { label: '5 places et +', price: 145 }
        ],
        category: 'Textile',
        imageUrl: '/Photo/sofa.png',
        gallery: [
            '/Photo/sofa.png',
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
        price: 70,
        priceList: [
            { label: '1 personne', price: 70 },
            { label: '2 personnes', price: 85 }
        ],
        category: 'Textile',
        imageUrl: '/Photo/mattress.png',
        gallery: [
            '/Photo/mattress.png',
            '/Photo/Tache.png'
        ],
        features: ['Anti-acariens', 'Élimination auréoles', 'Hypoallergénique']
    },
    {
        id: 's3',
        name: 'Prestations Automobile',
        tagline: 'Idéal pour redonner de l\'éclat à votre véhicule ou préparer une vente.',
        description: 'Lavage intérieur et extérieur complet à domicile. Prélavage, aspiration, shampoing des sièges.',
        longDescription: 'Nous intervenons sur votre lieu de travail ou à domicile pour un nettoyage méticuleux. De la citadine à l\'utilitaire, nous traitons les plastiques, aspirons en profondeur et rénovons vos sièges.',
        price: 120,
        priceList: [
            { label: 'Intérieur & Extérieur (L\'essentiel)', price: 120 },
            { label: 'Remise à neuf Intérieure (Coup de frais)', price: 150 },
            { label: 'Remise à neuf Complète (Le prestige)', price: 180 }
        ],
        category: 'Auto',
        imageUrl: '/Photo/car_interior.png',
        gallery: [
            '/Photo/car_interior.png',
            '/Photo/shampouineuse%20vs%20nettoyeur%20vapeur.jpg'
        ],
        features: ['Prélavage mousse', 'Soin des cuirs', 'Cire de protection', 'Désinfection habitacle']
    },
    {
        id: 's4',
        name: 'Nettoyage Tapis',
        tagline: 'Ravivez les couleurs.',
        description: 'Décrassage en profondeur des fibres, qu\'elles soient synthétiques, laine ou tapis d\'Orient.',
        longDescription: 'Les tapis sont de véritables nids à poussière et allergènes. Notre matériel haut de gamme permet d\'extraire la saleté incrustée au cœur des fibres sans les abîmer. Nous traitons les mauvers odeurs (animaux, tabac) et redonnons de l\'éclat aux couleurs.',
        price: 50,
        priceList: [
            { label: '1 Tapis', price: 50 },
            { label: '2 Tapis', price: 80 },
            { label: '3 Tapis', price: 100 }
        ],
        category: 'Textile',
        imageUrl: '/Photo/carpet.png',
        gallery: [
            '/Photo/carpet.png',
            '/Photo/matelas.webp'
        ],
        features: ['Fibres naturelles', 'Fibres synthétiques', 'Séchage contrôlé']
    },
    {
        id: 's5',
        name: 'Nettoyage de Bureau',
        tagline: 'Des espaces de travail impeccables.',
        description: 'Solutions sur mesure pour vos locaux professionnels.',
        longDescription: 'Nettoyage hebdomadaire établi sur devis selon la surface. Un environnement sain favorise la productivité et reflète le professionnalisme de votre entreprise.',
        price: 35,
        priceLabel: '35 € / h',
        category: 'Désinfection',
        imageUrl: '/Photo/office.png',
        features: ['Hebdomadaire', 'Sur mesure', 'Flexible']
    },
    {
        id: 's6',
        name: 'Nettoyage de Fin de Chantier',
        tagline: 'Après travaux.',
        description: 'Solutions sur mesure pour vos espaces après chantier.',
        longDescription: 'Mise au propre approfondie après rénovation ou construction. Établi sur devis après visite, pour faire briller votre nouveau lieu de vie ou de travail.',
        price: 0,
        priceLabel: 'Sur devis (au m²)',
        category: 'Désinfection',
        imageUrl: '/Photo/post_construction.png',
        features: ['Visite préalable', 'Nettoyage complet', 'Dépoussiérage']
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
