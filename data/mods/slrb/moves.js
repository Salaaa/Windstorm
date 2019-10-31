'use strict';

// Used for bumbadadabum and Snaquaza's move
const RandomStaffBrosTeams = require('./random-teams');
const Pokemon = require(/** @type {any} */ ('../../../.sim-dist/pokemon')).Pokemon;

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
	/*
	// Example
	"moveid": {
		accuracy: 100, // a number or true for always hits
		basePower: 100, // Not used for Status moves, base power of the move, number
		category: "Physical", // "Physical", "Special", or "Status"
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		id: "moveid",
		name: "Move Name",
		pp: 10, // unboosted PP count
		priority: 0, // move priority, -6 -> 6
		flags: {}, // Move flags https://github.com/Zarel/Pokemon-Showdown/blob/master/data/moves.js#L1-L27
		secondary: {
			status: "tox",
			chance: 20,
		}, // secondary, set to null to not use one. Exact usage varies, check data/moves.js for examples
		target: "normal", // What does this move hit?
		// normal = the targeted foe, self = the user, allySide = your side (eg light screen), foeSide = the foe's side (eg spikes), all = the field (eg raindance). More can be found in data/moves.js
		type: "Water", // The move's type
		// Other useful things
		noPPBoosts: true, // add this to not boost the PP of a move, not needed for Z moves, dont include it otherwise
		isZ: "crystalname", // marks a move as a z move, list the crystal name inside
		zMoveEffect: '', // for status moves, what happens when this is used as a Z move? check data/moves.js for examples
		zMoveBoost: {atk: 2}, // for status moves, stat boost given when used as a z move
		critRatio: 2, // The higher the number (above 1) the higher the ratio, lowering it lowers the crit ratio
		drain: [1, 2], // recover first num / second num % of the damage dealt
		heal: [1, 2], // recover first num / second num % of the target's HP
	},
	*/
	// Please keep sets organized alphabetically based on staff member name!
	// A
	"assecretplan": {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		desc: "This move will always deal neutral damage. Additionally, this move will randomly apply either paralysis, burn, or -2 SpA.",
		shortDesc: "Neutral damage. Para, burn, or -2 SpA.",
		id: "assecretplan",
		isNonstandard: "Custom",
		name: "A's Secret Plan",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onHit(target, source, move) {
			let effect = this.random(3);
			if (effect === 0) {
				target.trySetStatus('par', source);
			} else if (effect === 1) {
				target.trySetStatus('brn', source);
			} else {
				this.boost({spa: -2}, target);
			}
		},
		secondary: null,
		target: "normal",
		type: "???",
	},
	// 0TakeAStudyBreak
	"takeastudybreak": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user falls asleep for the turn and restores all of its HP, curing itself of any major status condition in the process. Fails if the user has full HP, is already asleep, or if another effect is preventing sleep.",
		shortDesc: "1 turn Rest.",
		id: "takeastudybreak",
		isNonstandard: "Custom",
		name: "Take a Study Break",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove(pokemon) {
			if (pokemon.hp < pokemon.maxhp && pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) return;
			this.add('-fail', pokemon);
			return null;
		},
		onHit(target) {
			if (!target.setStatus('slp')) return false;
			target.statusData.time = 1;
			target.statusData.startTime = 1;
			this.heal(target.maxhp / 2); //Aeshetic only as the healing happens after you fall asleep in-game
			this.add('-status', target, 'slp', '[from] move: Rest');
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	// A Phantom
	"forestfire": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Burns and adds Ghost to the target.",
		shortDesc: "Burns and adds Ghost to the target.",
		id: "forestfire",
		name: "Forest Fire",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onHit(target) {
			if (target.hasType('Ghost')) return false;
			if (!target.addType('Ghost')) return false;
			this.add('-start', target, 'typeadd', 'Ghost', '[from] move: Trick-or-Treat');

			if (target.side.active.length === 2 && target.position === 1) {
				// Curse Glitch
				const action = this.willMove(target);
				if (action && action.move.id === 'curse') {
					action.targetLoc = -1;
				}
			}
		},
		status: 'brn',
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	// ArchasTL
	"nerdslandering": {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "This move has a 30% chance to burn. Summons sun.",
		shortDesc: "30% burn. Summons sun.",
		id: "nerdslandering",
		name: "Nerd Slandering",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Coil", source);
		},
		onModifyMove(move, pokemon) {
			this.field.setWeather('sunnyday');
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		secondary: {
			chance: 30,
			status: 'brn',
		},
		zMovePower: 200,
	},
	// barton
	"hyperlink": {
		accuracy: 90,
		basePower: 60,
		category: "Special",
		desc: "Has a 50% chance to force the target to switch.",
		id: "hyperlink",
		name: "Hyperlink",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onHit(target, source, move) {
			if (this.random(2) === 0) {
				target.forceSwitchFlag = true;
			}
		},
		target: "normal",
		type: "Fairy",
	},
	// Aus Elise
	"Zwischenzung": {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the opponent.",
		shortDesc: "Hits two turns after being used.",
		id: 'zwischenzung',
		name: "Zwischenzung",
		pp: 5,
		priority: 0,
		flags: {},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
			move: 'zwischenzung',
			source: source,
			moveData: {
				id: 'zwischenzung',
				name: "Zwischenzung",
				accuracy: 100,
				basePower: 120, 
				category: "Special",
				priority: 0,
				flags: {},
				effectType: 'Move',
				isFutureMove: true,
				type: 'Fairy',
				},
			});
			this.add('-start', source, 'Future Sight');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Fairy"
	},
	// BetaDog
	"snuggles": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Attack and Sp. Attack by 2 stages. Raises user's Defense and Sp. Defense by 1 stage.",
		shortDesc: "Target: -2 Atk/SpA. User: +1 Def/SpD.",
		id: "snuggles",
		name: "Snuggles",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			this.boost({def: 1, spd: 1}, attacker, attacker, move);
		},
		boosts: {
			atk: -2,
			spa: -2,
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// Big Boy Teddy
	"poweroffluff": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Speed by 2 stages and its Attack by 1 stage.",
		shortDesc: "Raises the user's Speed by 2 and Attack by 1.",
		id: "poweroffluff",
		isNonstandard: "Custom",
		name: "Power of Fluff",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 2,
			atk: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	// brownisaur
	"happybirthdayd": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "No competitive use.",
		id: "happybirthdayd",
		name: "Happy Birthday! :D",
		pp: 40,
		priority: 0,
		flags: {},
		onTryHit(target, source) {
			this.add('-activate', target, 'move: Celebrate');
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveBoost: {atk: 2, def: 2, spa: 2, spd: 2, spe: 2},
	},
	// BruceWee
	"bruceboost": {
		basePower: 100,
		accuracy: 100,
		category: "Special",
		desc: "Has a 10% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
		id: "bruceboost",
		name: "Bruce Boost",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Conversion", source);
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
			this.add('-anim', target, 'Extreme Evoboost', target);
		},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	// CJer
	cjerseizure: {
		accuracy: 90,
		category: "Status",
		desc: "Swagger, Torment, Taunt, and Toxic.",
		shortDesc: "Swagger, Torment, Taunt, and Toxic.",
		id: "cjerseizure",
		name: "CJer Seizure™",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect:0, snatch: 1, mirror: 1},
		volatileStatus: 'confusion',
		boosts: {
			atk: 2,
		},
		onHit(pokemon) {
			pokemon.addVolatile('torment');
			pokemon.addVolatile('taunt');
		},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		status: 'tox',
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	// CJtheGold
	"touchofmidas": {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		desc: "Causes the target to become a Electric type. Fails if the target is an Arceus or a Silvally, or if the target is already purely Electric type.",
		shortDesc: "Changes the target's type to Electric.",
		id: "touchofmidas",
		name: "Touch of Midas",
		isNonstandard: "Custom",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1,},
		onPrepareHit(target, source) {
			if (target.getTypes().join() === 'Electric' || !target.setType('Electric')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				return null;
			}
			this.add('-start', target, 'typechange', 'Electric');
		},
		onAfterHit(target, source, move) {
			let newBaseTypes = target.template.types;
			target.setType(newBaseTypes);
			this.add('-start', target, 'typechange', newBaseTypes.join('/'));
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	// Elena Bonita
	"undyinglove": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Has a 85% chance to infatuate the target. Heals 50%.",
		id: "undyinglove",
		name: "Undying Love",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onHit(target, source, move) {
			if (this.random(100) >= 15) {
				target.addVolatile('attract');
			}
				this.heal(source.maxhp / 2, source);
		},
		target: "normal",
		type: "Fairy",
},
	// fart
	souptime: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "If the user is a Kartana, the user's primary type becomes a random type, matching this move.",
		shortDesc: "Changes user/move type to fire, water, or grass.",
		id: "souptime",
		name: "Soup Time!",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Conversion", source);
		},
		onModifyMove(move, pokemon) {
			let types = ['Fire','Water','Grass'];
			let randomType = this.sample(types);
			move.type = randomType;
			pokemon.addType(randomType);
			this.add('-start', pokemon, 'typeadd', randomType);
		},
		onHit(target, source) {
			this.add('-anim', source, "Spectral Thief", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// fart
	soupstealing7starstrike: {
		accuracy: true,
		basePower: 195,
		category: "Physical",
		desc: "Matches the most recent of the user's Soup Time! typing changes. Defaults to Fairy if Soup Time! has not been used.",
		shortDesc: "Matches current Soup Time! type or Fairy.",
		id: "soupstealing7starstrike",
		name: "Soup-Stealing 7-Star Strike",
		isNonstandard: "Custom",
		pp: 1,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onModifyMove(move, pokemon) {
			let thirdType = pokemon.types[pokemon.types.length-1];
			move.type = thirdType;
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Rock Polish', source);
			this.add('-anim', source, 'Let\'s Snuggle Forever', target);
		},
		onHit() {
			this.add(`c|#fart|did someone say soup?`);
		},
		isZ: "fartiumz",
		target: "normal",
		type: "Normal",
	},
	// Flare
	"busted": {
		basePower: 80,
		accuracy: 100,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "busted",
		name: "Busted",
		isNonstandard: "Custom",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// GeoffBruedly
	"fmagikarp": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "This attack does nothing on the first turn and executes on the second. Traps, confuses, and paralyzes.",
		shortDesc: "Charges, then hits foe(s) turn 2. Traps, confuses, and paralyzes.",
		id: "fmagikarp",
		name: "f Magikarp",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				defender.addVolatile('confusion');
				defender.trySetStatus('par');
				return;
			}
			this.add('-nothing');
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	// Host Joe
	"infiniteabyss": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Summons Trick Room and lowers the user's Speed by one stage.",
		shortDesc: "User's Spe. -1; sets Trick Room.",
		id: "infiniteabyss",
		name: "Infinite Abyss",
		isNonstandard: "Custom",
		pp: 5,
		onModifyMove(move) {
			if (!this.field.pseudoWeather.trickroom) {
				move.pseudoWeather = 'trickroom';
			}
		},
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Coil", source);
			this.add('-anim', source, "Extreme Evoboost", source);
		},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// hyruleEnigma
	"swordbeam": {
		accuracy: true,
		basePower: 240,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hp !== pokemon.maxhp) return move.basePower * 0.3;
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Full HP: this move does not check accuracy.",
		id: "swordbeam",
		isNonstandard: "Custom",
		name: "Sword Beam",
		pp: 5,
		flags: {protect: 1, mirror: 1, distance: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			if(source.hp < source.maxhp / 1.11115) {return false;}
			this.add('-anim', source, 'Searing Sunraze Smash', target);
		},
		secondary: null,
		target: "normal",
		type: "???",
	},
	// i want a lamp
	"lamplust": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
		id: "lamplust",
		name: "Lamp Lust",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Bug",
		zMovePower: 160,
		contestType: "Cool",
	},
	// Krookies
	"yummycookies": {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "yummycookies",
		isNonstandard: "Custom",
		name: "Yummy Cookies!!!",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, punch: 1, heal: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// Lumi Q
	"stingpunch": {
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		desc: "Raises the user's Speed by 2 stages if this move knocks out the target.",
		shortDesc: "Raises user's Speed by 2 if this KOes the target.",
		id: "stingpunch",
		name: "Sting Punch",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Meteor Mash', target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({spe: 2}, pokemon, pokemon, move);
		},
		target: "normal",
		type: "Bug",
	},
	// MajesticAngelo
	"malicedecree": {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Lowers a random stat of the user by 2.",
		shortDesc: "Lowers one of the user's stats by 2.",
		id: "malicedecree",
		isNonstandard: "Custom",
		name: "Malice Decree",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		onAfterMoveSecondarySelf(target) {
			let stats = [];
			for (let stat in target.boosts) {
				// @ts-ignore
				if (target.boosts[stat] > -6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = this.sample(stats);
				/**@type {{[k: string]: number}} */
				let boost = {};
				boost[randomStat] = -2;
				this.boost(boost);
			} else {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// MajesticLucario
	"deusexmachina": {
		accuracy: 85,
		basePower: 120,
		category: "Special",
		desc: "This move has a 30% chance to boost Special Attack by two stages before attacking.",
		shortDesc: "30% +2 SpA before attack.",
		id: "deusexmachina",
		name: "Deus Ex Machina",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Coil", source);
		},
		onModifyMove(move, pokemon) {
			 var allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
			if (allies.length == 1) {
				if ((Math.floor(this.random() * 100)+1)<61) {
					this.boost({spa: 2}, pokemon);
					this.add('-anim', pokemon, "Extreme Evoboost", pokemon);
				}
			} else {
				if ((Math.floor(this.random() * 100)+1)<31) {
					this.boost({spa: 2}, pokemon);
					this.add('-anim', pokemon, "Extreme Evoboost", pokemon);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 200,
	},
	// Marukomuru
	"rainbowpower": {
		basePower: 0,
		accuracy: true,
		category: "Status",
		desc: "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage. Applies Aqua Ring and summons Electric Terrain.",
		shortDesc: "Raises all stats by 1 (not acc/eva), Aqua Ring, Electric Terrain.",
		id: "rainbowpower",
		name: "Rainbow Power",
		isNonstandard: "Custom",
		pp: 2,
		priority: 0,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Extreme Evoboost', source);
			target.addVolatile('aquaring', source);
		},
		onAfterMoveSecondarySelf() {
			this.field.setTerrain('electricterrain');
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "self",
		type: "Psychic",
		noPPBoosts: true
	},
	// MdPikachu	
	"report": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Suction Cups Ability, or this move hit a substitute. Ignores Electric immunity.",
		shortDesc: "Forces the target to switch to a random ally. Ignores Electric immunity.",
		id: "report",
		isViable: true,
		name: "/report",
		pp: 10,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		onEffectiveness(typeMod, type, move) {
			if (move.type !== 'Electric') return;
			let target = this.activeTarget;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Ground type and immune to Electric
			if (!target.runImmunity('Electric')) {
				if (target.hasType('Ground')) return 0;
			}
		},
		ignoreImmunity: {'Electric': true},
		forceSwitch: true,
		target: "normal",
		type: "Electric",
		zMovePower: 160,
	},
	// MobileGreenNamed
	"toasterbomb": {
		basePower: 110,
		accuracy: 95,
		category: "Special",
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		id: "toasterbomb",
		name: "Toaster Bomb",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	// Moxie Latios
	extrememoxieboost: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Boosts Attack and Speed; Mega Evolves. Summons Sandstorm and removes negative stat boosts.",
		shortDesc: "+1 Atk/Spe, Mega, Sandstorm.",
		id: "extrememoxieboost",
		name: "ExtremeMoxieBoost",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {},
		weather: 'Sandstorm',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Quiver Dance", source);
			if (source.template.speciesid === 'latios') {
				source.formeChange('Latios-Mega', true);
			}
			var boosts;
			for (let i in source.boosts) {
				if (source.boosts[i] < 0) {
					boosts[i] = 0;
				}
			}
			source.setBoost(boosts);
			this.add('-clearnegativeboost', source, '[silent]');
			this.add('-start', source, 'typechange', `Dragon/Ground`);
		},
		boosts: {atk: 1, spe: 1},
		target: "self",
		type: "Psychic",
	},
	// mustard
	"l": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Atk/SpA by 2 stages and its Spe by 1 stage. Normal moves become Psychic type when used by mustard.",
		shortDesc: "Atk/SpA +2, Spe +1. Normal = Psychic.",
		id: "l",
		isNonstandard: "Custom",
		name: "L",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 1,
			atk: 2,
			spa: 2,
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('lEffect');
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Smart",
	},
	// pinkdragontamer
	"triplenightmare": {
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		id: "triplenightmare",
		isNonstandard: "Custom",
		name: "Triple Nightmare",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Defog", target);
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// rYGLY
	"wukongfist": {
		accuracy:100,
		basePower: 100,
		category: "Physical",
		desc: "30% chance to burn the target.",
		shortDesc: "30% chance to burn the target.",
		id: "wukongfist",
		name: "Wu-Kong Fist",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 30,
			status: "brn",
		},
		target: "normal",
		type: "Fire",
	},
	// SacredLatias
	"sacredmist": {
		accuracy: 90,
		basePower: 90,
		isNonstandard: "Custom",
		category: "Special",
		desc: "If this move is successful, terrain becomes Misty Terrain. Cures status.",
		shortDesc: "Summons Misty Terrain; cures status.",
		id: "sacredmist",
		name: "Sacred Mist",
		pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		onModifyMove() {
			this.field.setTerrain('mistyterrain');
		},
		onHit(pokemon) {
			pokemon.cureStatus();
		},
		target: "normal",
		type: "Psychic",
        zMovePower: 185,
	},
	// Servine
	"favorableexpenditureentitlement": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "This move lowers the user's Defense and Special Defense by 1 stage. Additionally, it adds the Ingrain volatile status.",
		shortDesc: "Lowers Def/SpD by 1. Adds Ingrain.",
		id: "favorableexpenditureentitlement",
		name: "Favorable Expenditure Entitlement",
		pp: 10,
		priority: 0,
		flags: {snatch:1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Ingrain", source);
			target.addVolatile('ingrain');
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "self",
		type: "Grass",
		noPPBoosts: true,
	},
	// Tauon
	boi: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "The user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		id: "boi",
		name: "B O I",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Supersonic Skystrike', target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	// Tenshi Nagae
	divinebork: {
		basePower: 130,
		accuracy: 100,
		category: "Physical",
		desc: "This move summons Sandstorm and boosts the user's Attack by one stage the first time it's used.",
		shortDesc: "User's Atk +1 once only. Summons Sandstorm.",
		id: "divinebork",
		name: "Divine Bork",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1, contact: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Meteor Mash', target);
		},
		onAfterMove(pokemon) {
			if (pokemon.happiness == 255) {
				this.add('-activate', pokemon, 'ability: Bork');
				this.boost({atk: 1}, pokemon, pokemon, 'move: Bork');
				pokemon.happiness = pokemon.happiness - 1;
			}
		},
		onAfterMoveSecondarySelf() {
			this.field.setWeather('sandstorm');
		},
		target: "normal",
		type: "Normal",
	},
	// VanillaBobcat
	frenchvanilla: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Raises both the user's and the target's Attack by 3 stages, lowers the Defense of both by 3 stages, confuses both Pokemon, and has a 100% chance to cause the target to flinch.",
		shortDesc: "+6 Atk, confusion, and attract to user & target.",
		id: "frenchvanilla",
		name: "French Vanilla",
		isNonstandard: "Custom",
		pp: 5,
		flags: {protect: 1, mirror: 1, contact: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Feather Dance", target);
			return this.runEvent('StallMove', source);
		},
		onHit(target, source) {
			this.add(`c|‽VanillaBobcat|Is it coffee or is it diabeetus?`);
			source.addVolatile('stall');
			this.boost({atk: 6}, target);
			this.boost({atk: 6}, source);
			target.addVolatile('confusion');
			source.addVolatile('confusion');
			target.addVolatile('attract');
			source.addVolatile('attract');
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	// yo boi arthurlis
	"absorptioncharge": {
		accuracy: 80,
		basePower: 120,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "absorptioncharge",
		isNonstandard: "Custom",
		name: "Absorption Charge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Giga Drain', target);
		},
		onAfterMoveSecondarySelf() {
			if (this.random(5) === 0) {
				this.field.setWeather('desolateland');
			}
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	// PokemonDeadChannel
	staffimpersonation: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user transforms into the target. The target's current stats, stat stages, types, moves, Ability, weight, gender, and sprite are copied. The user's level and HP remain the same and each copied move receives only 5 PP, with a maximum of 5 PP each. The user can no longer change formes if it would have the ability to do so. This move fails if it hits a substitute, if either the user or the target is already transformed, or if either is behind an Illusion. Clears the opponent's boosts.",
		shortDesc: "Transforms + clears boosts",
		id: "staffimpersonation",
		name: "Staff Impersonation",
		pp: 10,
		priority: 1,
		flags: {mystery: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onHit(target, pokemon) {
			pokemon.transformInto(target);
			if (pokemon.transformed) {
				target.clearBoosts();
				this.add('-clearboost', target);
			} else {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	"attract": {
		num: 213,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Causes the target to become infatuated, making it unable to attack 50% of the time. Fails if both the user and the target are the same gender, if either is genderless, or if the target is already infatuated. The effect ends when either the user or the target is no longer active. Pokemon with the Oblivious Ability or protected by the Aroma Veil Ability are immune.",
		shortDesc: "A target of the opposite gender gets infatuated.",
		id: "attract",
		name: "Attract",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'attract',
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.id === 'cutecharm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
				} else if (effect.id === 'destinyknot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectData.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
},
};

exports.BattleMovedex = BattleMovedex;
