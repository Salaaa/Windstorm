'use strict';

/**@type {{[k: string]: ModdedTemplateData}} */
let BattlePokedex = {
	/*
	// Example
	speciesid: {
		inherit: true, // Always use this, makes the pokemon inherit its default values from the parent mod (gen7)
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100}, // the base stats for the pokemon
	},
	*/
	// A
	mew: {
		inherit: true,
		abilities: {0: 'Arcane Tactics'},
		types: ['Psychic', 'Fairy'],
	},
	// A Phantom
	phantump: {
		inherit: true,
		abilities: {0: 'Phantom Flex'},
		baseStats: {hp: 86, atk: 100, def: 96, spa: 140, spd: 120, spe: 76},
	},
	// ArchasTL
	lilligant: {
		inherit: true,
		abilities: {0: 'AFK'},
	},
	// Aus Elise
	meowsticf:{
		inherit: true,
		abilities: {0: 'Regenerator'},
		baseStats: {hp: 103, atk: 60, def: 126, spa: 80, spd: 126, spe: 50},
		types: ['Normal', 'Fairy'],
	},
	// Barton
	clefable: {
		inherit: true,
		abilities: {0: 'Vibrant'},
	},
	// Barton
	houndour: {
		inherit: true,
		baseStats: {hp: 90, atk: 120, def: 60, spa: 160, spd: 100, spe: 130},
		abilities: {0: 'Fluffy Paws'},
	},
	// Big Boy Teddy
	bewear: {
		inherit: true,
		abilities: {0: 'Fur Coat'},
	},
	// brownisaur
	bulbasaur: {
		inherit: true,
		types: ['Fairy', 'Psychic'],
		abilities: {0: 'Sweet Disguise'},
	},
	// CJer
	porygon: {
		inherit: true,
		baseStats: {hp: 105, atk: 100, def: 110, spa: 125, spd: 115, spe: 80},
		abilities: {0: 'Corrosion'},
	},
	// CJtheGold
	marshadow: {
		inherit: true,
		abilities: {0: 'Shadow Nerd'},
	},
	// Elena Bonita
	lopunny: {
		inherit: true,
		abilities: {0: 'Fur Coat'},
	},
	lopunnymega: {
		inherit: true,
		abilities: {0: 'Fur Coat'},
	},
	// fart
	kartana: {
		inherit: true,
		types: ['Fairy', 'Steel'],
		abilities: {0: 'Heat Rises'},
	},
	// Flare
	zoroark: {
		inherit: true,
		abilities: {0: 'Super Illusion'},
	},
	// GeoffBruedly
	feebas: {
		inherit: true,
		baseStats: {hp: 100, atk: 150, def: 90, spa: 180, spd: 160, spe: 90},
		abilities: {0: 'Primordial Sea'},
	},
	// hyruleEnigma
	aegislash: {
		inherit: true,
		abilities: {0: 'Red Tunic'},
	},
	// i want a lamp
	venomoth: {
		inherit: true,
		abilities: {0: 'Flashdrive'},
	},
	// Krookies
	krookodile: {
		inherit: true,
		abilities: {0: 'Moxie'},
	},
	// Lumi Q
	scizor: {
		inherit: true,
		abilities: {0: 'Jolt Haymaker'},
	},
	// MajesticAngelo
	greninja: {
		inherit: true,
		abilities: {0: 'Protean'},
	},
	// Marukomuru
	oricoriopompom: {
		inherit: true,
		abilities: {0: 'Shield Dust'},
	},
	// MdPikachu
	pikachu: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 80, spa: 100, spd: 100, spe: 180},
		abilities: {0: 'Prankster'},
	},
	// MobileGreenNamed
	rotomheat: {
		inherit: true,
		abilities: {0: 'Adaptability'},
	},
	// MoxieLatios
	latios: {
		inherit: true,
		abilities: {0: 'Moxie'},
	},
	// Moxie Latios
	latiosmega: {
		inherit: true,
		abilities: {0: 'Moxie'},
		types: ['Dragon', 'Ground'],
		baseStats: {hp: 80, atk: 160, def: 100, spa: 130, spd: 120, spe: 110},
	},
	// PokemonDeadChannel
	ditto: {
		inherit: true,
		abilities: {0: 'Remix'},
	},
	// mustard
	azelf: {
		inherit: true,
		abilities: {0: 'Huge Power'},
	},
	// pinkdragontamer
	hydreigon: {
		inherit: true,
		abilities: {0: 'Contrary'},
	},
	// Polestar Obey
	lucario: {
		inherit: true,
		abilities: {0: 'Fallen Warriors'},
	},
	// rYGLY
	monferno: {
		inherit: true,
		baseStats: {hp: 64, atk: 118, def: 92, spa: 118, spd: 92, spe: 121},
		abilities: {0: 'Adaptability'},
	},
	// Sacred Latias
	latias: {
		inherit: true,
		abilities: {0: 'Neuroforce'},
	},
	// Servine
	servine: {
		inherit: true,
		baseStats: {hp: 60, atk: 100, def: 115, spa: 100, spd: 115, spe: 123},
		abilities: {0: 'Contrary'},
	},
	// Tauon
	skarmory: {
		inherit: true,
		abilities: {0: 'Gale Wings v1'},
	},
	// Tenshi
	stoutland: {
		inherit: true,
		abilities: {0: 'Miracle Sand'},
	},
	// VanillaBobcat
	persian: {
		inherit: true,
		abilities: {0: 'Food Coma'},
	},
	// VanillaBobcat
	persianalola: {
		inherit: true,
		abilities: {0: 'Harvest'},
	},
	// yo boi arthurlis
	torterra: {
		inherit: true,
		types: ['Grass', 'Rock'],
		abilities: {0: 'Harvesting Summer'},
	},
};

exports.BattlePokedex = BattlePokedex;
