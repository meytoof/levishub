"use client";

import { ArrowRight, Check, Clock, Sparkles, Target, Zap } from "lucide-react";
import { useState } from "react";
import { PulseCTA } from "./PulseCTA";

interface QuizQuestion {
	id: number;
	question: string;
	options: {
		text: string;
		score: number;
		icon?: React.ReactNode;
	}[];
}

interface QuizResult {
	plan: string;
	description: string;
	price: string;
	discount?: string;
	features: string[];
	cta: string;
	href: string;
}

const quizQuestions: QuizQuestion[] = [
	{
		id: 1,
		question: "Quel type de projet souhaitez-vous ?",
		options: [
			{
				text: "Site vitrine simple",
				score: 1,
				icon: <Target className="w-5 h-5" />,
			},
			{
				text: "E-commerce / Boutique",
				score: 2,
				icon: <Zap className="w-5 h-5" />,
			},
			{
				text: "Application sur mesure",
				score: 3,
				icon: <Sparkles className="w-5 h-5" />,
			},
		],
	},
	{
		id: 2,
		question: "Quel est votre budget pour la création ?",
		options: [
			{
				text: "Moins de 500€",
				score: 1,
				icon: <Target className="w-5 h-5" />,
			},
			{
				text: "500€ - 1500€",
				score: 2,
				icon: <Zap className="w-5 h-5" />,
			},
			{
				text: "Plus de 1500€",
				score: 3,
				icon: <Sparkles className="w-5 h-5" />,
			},
		],
	},
	{
		id: 3,
		question: "Dans quel délai souhaitez-vous votre projet ?",
		options: [
			{
				text: "Moins d'1 mois",
				score: 1,
				icon: <Clock className="w-5 h-5" />,
			},
			{
				text: "1 à 3 mois",
				score: 2,
				icon: <Zap className="w-5 h-5" />,
			},
			{
				text: "Plus de 3 mois",
				score: 3,
				icon: <Sparkles className="w-5 h-5" />,
			},
		],
	},
	{
		id: 4,
		question: "Quel niveau de fonctionnalités recherchez-vous ?",
		options: [
			{
				text: "Fonctionnalités de base",
				score: 1,
				icon: <Target className="w-5 h-5" />,
			},
			{
				text: "Fonctionnalités avancées",
				score: 2,
				icon: <Zap className="w-5 h-5" />,
			},
			{
				text: "Fonctionnalités sur mesure",
				score: 3,
				icon: <Sparkles className="w-5 h-5" />,
			},
		],
	},
	{
		id: 5,
		question: "Quel niveau de maintenance souhaitez-vous ?",
		options: [
			{
				text: "Maintenance basique",
				score: 1,
				icon: <Target className="w-5 h-5" />,
			},
			{
				text: "Maintenance standard",
				score: 2,
				icon: <Zap className="w-5 h-5" />,
			},
			{
				text: "Maintenance premium",
				score: 3,
				icon: <Sparkles className="w-5 h-5" />,
			},
		],
	},
];

const getQuizResult = (totalScore: number): QuizResult => {
	if (totalScore <= 8) {
		return {
			plan: "Starter",
			description: "Parfait pour démarrer votre présence en ligne",
			price: "29",
			discount: "23",
			features: [
				"Site vitrine responsive",
				"Hébergement haute performance",
				"Certificat SSL gratuit",
				"Support par email",
			],
			cta: "Choisir le plan Starter",
			href: "/contact?plan=starter&quiz=true",
		};
	} else if (totalScore <= 12) {
		return {
			plan: "Pro",
			description: "Solution complète pour votre business",
			price: "59",
			discount: "47",
			features: [
				"Site vitrine + backoffice",
				"Paiements Stripe intégrés",
				"Support prioritaire",
				"Monitoring 24/7",
			],
			cta: "Choisir le plan Pro",
			href: "/contact?plan=pro&quiz=true",
		};
	} else {
		return {
			plan: "Premium",
			description: "Service complet et dédié",
			price: "99",
			discount: "79",
			features: [
				"E-commerce complet",
				"API personnalisées",
				"Support téléphonique",
				"Conseils stratégiques",
			],
			cta: "Choisir le plan Premium",
			href: "/contact?plan=premium&quiz=true",
		};
	}
};

export function PricingQuiz() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<number[]>([]);
	const [showResult, setShowResult] = useState(false);
	const [totalScore, setTotalScore] = useState(0);

	const handleAnswer = (score: number) => {
		const newAnswers = [...answers, score];
		setAnswers(newAnswers);

		if (currentQuestion < quizQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			const finalScore = newAnswers.reduce(
				(sum, score) => sum + score,
				0
			);
			setTotalScore(finalScore);
			setShowResult(true);
		}
	};

	const resetQuiz = () => {
		setCurrentQuestion(0);
		setAnswers([]);
		setShowResult(false);
		setTotalScore(0);
	};

	if (showResult) {
		const result = getQuizResult(totalScore);
		return (
			<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
				<div className="text-center mb-6">
					<Sparkles className="w-16 h-16 text-fuchsia-400 mx-auto mb-4" />
					<h3 className="text-2xl font-bold text-foreground mb-2">
						🎯 Plan recommandé pour vous
					</h3>
					<p className="text-muted-foreground">
						Basé sur vos réponses, voici ce qui vous convient le
						mieux
					</p>
				</div>

				<div className="bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-xl p-6 mb-6">
					<h4 className="text-xl font-bold text-foreground mb-2">
						{result.plan}
					</h4>
					<p className="text-muted-foreground mb-4">
						{result.description}
					</p>

					<div className="flex items-center justify-center gap-2 mb-4">
						{result.discount && (
							<>
								<span className="text-2xl line-through text-muted-foreground">
									€{result.price}
								</span>
								<span className="text-3xl font-bold text-fuchsia-400">
									€{result.discount}
								</span>
							</>
						)}
						<span className="text-lg text-muted-foreground">
							/mois
						</span>
					</div>

					<div className="space-y-2">
						{result.features.map((feature, index) => (
							<div
								key={index}
								className="flex items-center gap-3"
							>
								<Check className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
								<span className="text-sm text-muted-foreground">
									{feature}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-3">
					<PulseCTA
						href={result.href}
						variant="primary"
						size="lg"
						className="flex-1"
					>
						{result.cta}
					</PulseCTA>
					<button
						onClick={resetQuiz}
						className="px-6 py-3 border border-neutral-500/30 rounded-lg text-foreground hover:bg-white/10 transition-colors"
					>
						Refaire le quiz
					</button>
				</div>
			</div>
		);
	}

	const question = quizQuestions[currentQuestion];
	const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

	return (
		<div className="bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
			<div className="text-center mb-8">
				<Sparkles className="w-16 h-16 text-fuchsia-400 mx-auto mb-4" />
				<h3 className="text-2xl font-bold text-foreground mb-2">
					🎯 Quiz : Trouvez votre plan idéal
				</h3>
				<p className="text-muted-foreground mb-4">
					Répondez à quelques questions pour recevoir une
					recommandation personnalisée
				</p>

				{/* Barre de progression */}
				<div className="w-full bg-neutral-700 rounded-full h-2 mb-2">
					<div
						className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 h-2 rounded-full transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
				<p className="text-sm text-muted-foreground">
					Question {currentQuestion + 1} sur {quizQuestions.length}
				</p>
			</div>

			<div className="mb-8">
				<h4 className="text-xl font-semibold text-foreground mb-6 text-center">
					{question.question}
				</h4>

				<div className="space-y-3">
					{question.options.map((option, index) => (
						<button
							key={index}
							onClick={() => handleAnswer(option.score)}
							className="w-full p-4 border border-neutral-500/30 rounded-lg text-left hover:border-fuchsia-500/50 hover:bg-white/5 transition-all duration-200 group"
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
									{option.icon}
								</div>
								<span className="text-foreground font-medium">
									{option.text}
								</span>
								<ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-fuchsia-400 transition-colors" />
							</div>
						</button>
					))}
				</div>
			</div>

			<div className="text-center">
				<p className="text-sm text-muted-foreground">
					💡 Ce quiz prend moins de 2 minutes et vous donne une
					recommandation précise
				</p>
			</div>
		</div>
	);
}
