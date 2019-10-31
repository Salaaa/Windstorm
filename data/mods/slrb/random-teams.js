'use strict';

/** @typedef {{[name: string]: SSBSet}} SSBSets */
/**
 * @typedef {Object} SSBSet
 * @property {string} species
 * @property {string | string[]} ability
 * @property {string | string[]} item
 * @property {GenderName} gender
 * @property {(string | string[])[]} moves
 * @property {string} signatureMove
 * @property {{hp?: number, atk?: number, def?: number, spa?: number, spd?: number, spe?: number}=} evs
 * @property {{hp?: number, atk?: number, def?: number, spa?: number, spd?: nmobumber, spe?: number}=} ivs
 * @property {string | string[]} nature
 * @property {number=} level
 * @property {boolean=} shiny
 */

const RandomTeams = require('../../random-teams');

class RandomStaffBrosTeams extends RandomTeams {
	randomStaffBrosTeam() {
		/** @type {PokemonSet[]} */
		let team = [];
		/** @type {SSBSets} */
		let sets = {
			/*
			// Example:
			'Username': {
				species: 'Species', ability: 'Ability', item: 'Item', gender: '',
				moves: ['Move Name', ['Move Name', 'Move Name']],
				signatureMove: 'Move Name',
				evs: {stat: number}, ivs: {stat: number}, nature: 'Nature', level: 100, shiny: false,
			},
			// Species, ability, and item need to be captialized properly ex: Ludicolo, Swift Swim, Life Orb
			// Gender can be M, F, N, or left as an empty string
			// each slot in moves needs to be a string (the move name, captialized properly ex: Hydro Pump), or an array of strings (also move names)
			// signatureMove also needs to be capitalized properly ex: Scripting
			// You can skip Evs (defaults to 82 all) and/or Ivs (defaults to 31 all), or just skip part of the Evs (skipped evs are 0) and/or Ivs (skipped Ivs are 31)
			// You can also skip shiny, defaults to false. Level can be skipped (defaults to 100).
			// Nature needs to be a valid nature with the first letter capitalized ex: Modest
			*/
			// Please keep sets organized alphabetically based on staff member name!/*
			'0TakeaStudyBreak': {
				species: 'Xerneas', ability: 'Fairy Aura', item: 'Power Herb', gender: 'M',
				moves: ['Geomancy', 'Moonblast', 'Flash Cannon'],
				signatureMove: 'Take a Study Break',
				evs: {atk: 4, def: 252, spd: 252}, nature: 'Bold',
			},
			'A': {
				species: 'Mew', ability: 'Arcane Tactics', item: 'Leftovers', gender: 'M',
				moves: ['Moonblast', 'Roost', 'Substitute'],
				signatureMove: "A's Secret Plan",
				evs: {hp: 192, def: 96, spd: 56, spe: 164}, nature: 'Timid', shiny: true,
			},
			'A Phantom': {
				species: 'Phantump', ability: 'Phantom Flex', item: 'Power Herb', gender: 'M',
				moves: ['Hex', 'Geomancy', 'Power Trip'],
				signatureMove: "Forest Fire",
				evs: {def: 4, spa: 252, spe: 252}, nature: 'Timid',
			},
			'AFKrchasTL': {
				species: 'Lilligant', ability: 'AFK', item: 'Life Orb', gender: 'F',
				moves: ['Seed Flare', 'Stun Spore', 'Quiver Dance'],
				signatureMove: 'Nerd Slandering',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid',
			},
			'barton': {
				species: 'Clefable', ability: 'Vibrant', item: 'Satsuma', gender: 'M',
				moves: ['Calm Mind', 'Moonlight', 'Heal Bell'],
				signatureMove: 'Hyperlink',
				evs: {hp: 248, spa: 8, def: 252}, nature: 'Bold',
			},
			'BetaDog': {
				species: 'Houndour', ability: 'Fluffy Paws', item: 'Eviolite', gender: 'M',
				moves: ['Fire Blast', 'Night Daze', 'Slack Off'],
				signatureMove: 'Snuggles',
				evs: {def: 4, spa: 252, spe: 4}, nature: 'Modest', shiny: true,
			},
			'Big Boy Teddy': {
				species: 'Bewear', ability: 'Fur Coat', item: 'Life Orb', gender: 'M',
				moves: ['Knock Off', 'Drain Punch', 'Cotton Guard'],
				signatureMove: 'Power of Fluff',
				evs: {atk: 4, spd: 252, spe: 252}, nature: 'Adamant',
			},
			'browni☿️saur': {
				species: 'Bulbasaur', ability: 'Sweet Disguise', item: 'Brownium Z', gender: 'F',
				moves: ['Moonblast', 'Psystrike', 'Moongeist Beam'],
				signatureMove: 'Happy Birthday! :D',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid',
			},
			'BruceWee': {
				species: 'Mewtwo', ability: 'Pressure', item: 'Leftovers', gender: 'M',
				moves: ['Psystrike', 'Shadow Ball', 'Recover'],
				signatureMove: 'Bruce Boost',
				evs: {hp: 252, spa: 252, spd: 4}, nature: 'Modest',
			},
			'CJer✿': {
				species: 'Porygon', ability: 'Corrosion', item: 'Eviolite', gender: 'M',
				moves: ['Recover', 'Substitute', 'Protect'],
				signatureMove: 'CJer Seizure™',
				evs: {hp: 4, spd: 252, spe: 252}, nature: 'Timid',
			},
			'CJtheGold ☯': {
				species: 'Marshadow', ability: 'Shadow Nerd', item: 'Focus Sash', gender: 'M',
				moves: ['Spectral Thief', 'High Jump Kick', 'Shadow Sneak'],
				signatureMove: 'Touch of Midas',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'Elena Bonita': {
				species: 'Lopunny', ability: 'Fur Coat', item: 'Lopunnite', gender: 'F',
				moves: ['Fake Out', 'High Jump Kick', 'Lovely Kiss'],
				signatureMove: 'Undying Love',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'fart': {
				species: 'Kartana', ability: 'Heat Rises', item: 'Fartium-Z', gender: 'M',
				moves: ['Sunsteel Strike', 'Play Rough', 'U-turn'],
				signatureMove: 'Soup Time!',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly', shiny: true,
			},
			'Flare': {
				species: 'Zoroark', ability: 'Super Illusion', item: 'Focus Sash', gender: 'M',
				moves: ['Sludge Bomb', 'Nasty Plot', 'U-turn'],
				signatureMove: 'Busted',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Hasty',
			},
			'GeoffBruedly': {
				species: 'Feebas', ability: 'Primordial Sea', item: 'Leftovers', gender: 'M',
				moves: ['Scald', 'Ice Beam', 'Thunder'],
				signatureMove: 'f Magikarp',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest',
			},
			'Host Joe': {
				species: 'Hoopa-Unbound', ability: 'Magician', item: 'Choice Band', gender: 'M',
				moves: ['Gunk Shot', 'Fire Punch', 'Drain Punch'],
				signatureMove: 'Infinite Abyss',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'hyruleEnigma': {
				species: 'Aegislash', ability: 'Red Tunic', item: 'Leftovers', gender: 'M',
				moves: ["kingsshield", 'Milk Drink', 'Agility'],
				signatureMove: 'Sword Beam',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid',
			},
			'i want a lamp': {
				species: 'Venomoth', ability: 'Flashdrive', item: 'Bright Powder', gender: 'M',
				moves: ['Quiver Dance', 'Moonlight', 'Sludge Bomb'],
				signatureMove: 'Lamp Lust',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid',
			},
			'Krookies': {
				species: 'Krookodile', ability: 'Moxie', item: 'Leftovers', gender: 'M',
				moves: ['Earthquake', 'Dragon Dance', 'Taunt'],
				signatureMove: 'Yummy Cookies!!!',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'Lumi Q': {
				species: 'Scizor', ability: 'Jolt Haymaker', item: 'Life Orb', gender: 'F',
				moves: ['Bullet Punch', 'Power-Up Punch', 'Ice Punch'],
				signatureMove: 'Sting Punch',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Adamant',
			},
			'MajesticAngelo': {
				species: 'Greninja', ability: 'Protean', item: 'Life Orb', gender: 'M',
				moves: ['Water Shuriken', 'Close Combat', 'Extreme Speed'],
				signatureMove: 'Malice Decree',
				evs: {atk: 252, spa: 4, spe: 252}, nature: 'Hasty',
			},
			'Marukomuru': {
				species: 'Oricorio-Pom-Pom', ability: 'Shield Dust', item: 'Berserk Amulet', gender: 'M',
				moves: ['Head Charge', 'Double Kick', 'Megahorn'],
				signatureMove: 'Rainbow Power',
				evs: {hp: 118, atk: 126, def: 96, spd: 96, spe: 72}, nature: 'Adamant',
			},
			'MdPikachu': {
				species: 'Pikachu', ability: 'Prankster', item: 'Leftovers', gender: 'M',
				moves: ['Metronome', 'Volt Tackle', 'Iron Tail'],
				signatureMove: '/report',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'MobileGreenNamed': {
				species: 'Rotom-Heat', ability: 'Adaptability', item: 'Choice Scarf', gender: 'M',
				moves: ['Ice Beam', 'Energy Ball', 'Thunderbolt'],
				signatureMove: 'Toaster Bomb',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid',
			},
			'Moxie ♥ Latios': {
				species: 'Latios', ability: 'Moxie', item: 'Soul Dew', gender: 'M',
				moves: ['Dragon Hammer', 'Spectral Thief', 'Shore Up'],
				signatureMove: 'ExtremeMoxieBoost',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Hasty', shiny: true,
			},
			'mustard': {
				species: 'Azelf', ability: 'Huge Power', item: 'Life Orb', gender: 'M',
				moves: ['Explosion', 'Photon Geyser', 'Boomburst'],
				signatureMove: 'L',
				evs: {atk: 4, spa: 252, spe: 252}, nature: 'Timid',
			},
			'pinkdragontamer': {
				species: 'Hydreigon', ability: 'Contrary', item: 'Life Orb', gender: 'F',
				moves: ['Roost', 'Overheat', 'Draco Meteor'],
				signatureMove: 'Triple Nightmare',
				evs: {def: 4, spa: 252, spe: 252}, nature: 'Timid',
			},
			'PokemonDeadChannel': {
				species: 'Ditto', ability: 'Remix', item: 'Expert Belt', gender: '',
				moves: [],
				signatureMove: 'Staff Impersonation',
				evs: {hp: 252}, nature: 'Serious',
			},
			'rYGLY': {
				species: 'Monferno', ability: 'Adaptability', item: 'Life orb', gender: 'M',
				moves: ['Close Combat', 'Mach Punch', 'U-turn'],
				signatureMove: 'Wu-Kong Fist',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'SacredLatias': {
				species: 'Latias', ability: 'Neuroforce', item: 'Dew of Dewm', gender: 'F',
				moves: ['Quiver Dance', 'Roost', 'Core Enforcer'],
				signatureMove: 'Sacred Mist',
				evs: {hp: 252, def: 252, spa: 4}, nature: 'Bold',
			},
			'Servine': {
				species: 'Servine', ability: 'Contrary', item: 'Wide Lens', gender: 'M',
				moves: ['Leaf Storm', 'Draco Meteor', 'Overheat'],
				signatureMove: 'Favorable Expenditure Entitlement',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Modest',
			},
			'Tauon': {
				species: 'Skarmory', ability: 'Gale Wings v1', item: 'Sharp Beak', gender: 'M',
				moves: ['Swords Dance', 'Roost', ['Taunt', 'Stealth Rock']],
				signatureMove: 'B O I',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Adamant',
			},
			'Tenshi': {
				species: 'Stoutland', ability: 'Miracle Sand', item: 'Poisonium Z', gender: 'M',
				moves: ['Power Whip', 'Iron Head', 'Purify'],
				signatureMove: 'Divine Bork',
				evs: {hp: 36, atk: 252, def: 220}, nature: 'Impish',
			},
			'VanillaBobcat': {
				species: 'Persian', ability: 'Food Coma', item: 'Sitrus Berry', gender: 'M',
				moves: ['V-Create', 'Thief', 'Zap Cannon'],
				signatureMove: 'French Vanilla',
				evs: {atk: 128, spa: 128, spe: 252}, nature: 'Timid',
			},
			'yo boi arthurlis': {
				species: 'Torterra', ability: 'Harvesting Summer', item: 'Iapapa Berry', gender: 'M',
				moves: ['Heat Crash', 'Stone Edge', 'Earthquake'],
				signatureMove: 'Absorption Charge',
				evs: {hp: 252, atk: 252, spd: 4}, nature: 'Adamant',
			},
		};
		let pool = Object.keys(sets);
		/** @type {{[type: string]: number}} */
		let typePool = {};
		while (pool.length && team.length < 6) {
			let name = this.sampleNoReplace(pool);
			let ssbSet = sets[name];
			// Enforce typing limits
			let types = this.getTemplate(ssbSet.species).types;
			if (name === 'A') types = ["Psychic", "Fairy"];
			if (name === 'browni☿️saur') types = ["Fairy", "Psychic"];
			if (name === 'fart') types = ["Fairy", "Steel"];
			if (name === 'yo boi arthurlis') types = ["Grass", "Rock"];
			let rejected = false;
			for (let type of types) {
				if (typePool[type] === undefined) typePool[type] = 0;
				if (typePool[type] >= 2) {
					// Reject
					rejected = true;
					break;
				}
			}
			if (rejected) continue;
			// Update type counts
			for (let type of types) {
				typePool[type]++;
			}
			/** @type {PokemonSet} */
			let set = {
				name: name,
				species: ssbSet.species,
				item: Array.isArray(ssbSet.item) ? this.sampleNoReplace(ssbSet.item) : ssbSet.item,
				ability: Array.isArray(ssbSet.ability) ? this.sampleNoReplace(ssbSet.ability) : ssbSet.ability,
				moves: [],
				nature: Array.isArray(ssbSet.nature) ? this.sampleNoReplace(ssbSet.nature) : ssbSet.nature,
				gender: ssbSet.gender,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: ssbSet.level || 100,
				shiny: ssbSet.shiny,
			};
			if (ssbSet.ivs) {
				for (let iv in ssbSet.ivs) {
					// IVs from the set override the default of 31, assume the hardcoded IVs are legal
					// @ts-ignore StatsTable has no index signature
					set.ivs[iv] = ssbSet.ivs[iv];
				}
			}
			if (ssbSet.evs) {
				for (let ev in ssbSet.evs) {
					// EVs from the set override the default of 0, assume the hardcoded EVs are legal
					// @ts-ignore StatsTable has no index signature
					set.evs[ev] = ssbSet.evs[ev];
				}
			} else {
				set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			}
			while (set.moves.length < 3 && ssbSet.moves.length > 0) {
				let move = this.sampleNoReplace(ssbSet.moves);
				if (Array.isArray(move)) move = this.sampleNoReplace(move);
				set.moves.push(move);
			}
			let move = this.sample(['Flamethrower', 'Ice Beam', 'Thunderbolt']);
			if (set.species === 'Mew') { set.moves.push(move); }
			set.moves.push(ssbSet.signatureMove);
			team.push(set);
		}
		return team;
	}
}

module.exports = RandomStaffBrosTeams;
