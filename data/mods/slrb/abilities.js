'use strict';
const RandomStaffBrosTeams = require('./random-teams'); // PDC's ability
/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	/*
	// Example
	"abilityid": {
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		id: "abilityid",
		name: "Ability Name",
		// The bulk of an ability is not easily shown in an example since it varies
		// For more examples, see https://github.com/Zarel/Pokemon-Showdown/blob/master/data/abilities.js
	},
	*/
	// PokemonDeadChannel
	remix: {
		desc: "This Pokemon transforms into a Pokemon that has a type advantage against the pokemon",
		shortDesc: "Transforms into a super effective pokemon.",
		id: "remix",
		name: "Remix",
		isNonstandard: "Custom",
		onStart(pokemon) {
			if (this.activeMove && this.activeMove.id === 'skillswap') return;
			let target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				let targetTypes = target.getTypes(true).filter(type => type !== '???');
				if (!targetTypes.length) {
					if (target.addedType) {
						targetTypes = ['Normal'];
					} else {
						return false;
					}
				}
				let weaknesses = [];
				for (let type in this.data.TypeChart) {
					let typeMod = this.getEffectiveness(type, targetTypes);
					if (typeMod > 0 && this.getImmunity(type, target)) weaknesses.push(type);
				}
				if (!weaknesses.length) {
					return false;
				}
				let validPokemon = ["Venusaur", "Charizard", "Blastoise", "Butterfree", "Beedrill", "Pidgeot", "Raticate", "Raticate-Alola", "Fearow", "Arbok", "Raichu", "Raichu-Alola", "Sandslash", "Sandslash-Alola", "Nidoqueen", "Nidoking", "Clefable", "Ninetales", "Ninetales-Alola", "Wigglytuff", "Vileplume", "Parasect", "Venomoth", "Dugtrio", "Dugtrio-Alola", "Persian", "Persian-Alola", "Golduck", "Primeape", "Arcanine", "Poliwrath", "Alakazam", "Machamp", "Victreebel", "Tentacruel", "Golem", "Golem-Alola", "Rapidash", "Slowbro", "Farfetch'd", "Dodrio", "Dewgong", "Muk", "Muk-Alola", "Cloyster", "Gengar", "Hypno", "Kingler", "Electrode", "Exeggutor", "Exeggutor-Alola", "Marowak", "Marowak-Alola", "Hitmonlee", "Hitmonchan", "Weezing", "Kangaskhan", "Seaking", "Starmie", "Mr. Mime", "Jynx", "Pinsir", "Tauros", "Gyarados", "Lapras", "Eevee-Starter", "Vaporeon", "Jolteon", "Flareon", "Omastar", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dragonite", "Mewtwo", "Mew", "Meganium", "Typhlosion", "Feraligatr", "Furret", "Noctowl", "Ledian", "Ariados", "Crobat", "Lanturn", "Xatu", "Ampharos", "Bellossom", "Azumarill", "Sudowoodo", "Politoed", "Jumpluff", "Sunflora", "Quagsire", "Espeon", "Umbreon", "Slowking", "Wobbuffet", "Girafarig", "Forretress", "Dunsparce", "Steelix", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Ursaring", "Magcargo", "Corsola", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndoom", "Kingdra", "Donphan", "Stantler", "Smeargle", "Hitmontop", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Tyranitar", "Lugia", "Ho-Oh", "Celebi", "Sceptile", "Blaziken", "Swampert", "Mightyena", "Linoone", "Beautifly", "Dustox", "Ludicolo", "Shiftry", "Swellow", "Pelipper", "Gardevoir", "Masquerain", "Breloom", "Slaking", "Ninjask", "Shedinja", "Exploud", "Hariyama", "Delcatty", "Sableye", "Mawile", "Aggron", "Medicham", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Swalot", "Sharpedo", "Wailord", "Camerupt", "Torkoal", "Grumpig", "Spinda", "Flygon", "Cacturne", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Whiscash", "Crawdaunt", "Claydol", "Cradily", "Armaldo", "Milotic", "Castform", "Kecleon", "Banette", "Tropius", "Chimecho", "Absol", "Glalie", "Walrein", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Salamence", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys", "Deoxys-Attack", "Deoxys-Defense", "Deoxys-Speed", "Torterra", "Infernape", "Empoleon", "Staraptor", "Bibarel", "Kricketune", "Luxray", "Roserade", "Rampardos", "Bastiodon", "Wormadam", "Wormadam-Sandy", "Wormadam-Trash", "Mothim", "Vespiquen", "Pachirisu", "Floatzel", "Cherrim", "Gastrodon", "Ambipom", "Drifblim", "Lopunny", "Mismagius", "Honchkrow", "Purugly", "Skuntank", "Bronzong", "Chatot", "Spiritomb", "Garchomp", "Lucario", "Hippowdon", "Drapion", "Toxicroak", "Carnivine", "Lumineon", "Abomasnow", "Weavile", "Magnezone", "Lickilicky", "Rhyperior", "Tangrowth", "Electivire", "Magmortar", "Togekiss", "Yanmega", "Leafeon", "Glaceon", "Gliscor", "Mamoswine", "Porygon-Z", "Gallade", "Probopass", "Dusknoir", "Froslass", "Rotom", "Rotom-Heat", "Rotom-Wash", "Rotom-Frost", "Rotom-Fan", "Rotom-Mow", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Giratina-Origin", "Cresselia", "Phione", "Manaphy", "Darkrai", "Shaymin", "Shaymin-Sky", "Victini", "Serperior", "Emboar", "Samurott", "Watchog", "Stoutland", "Liepard", "Simisage", "Simisear", "Simipour", "Musharna", "Unfezant", "Zebstrika", "Gigalith", "Swoobat", "Excadrill", "Audino", "Conkeldurr", "Seismitoad", "Throh", "Sawk", "Leavanny", "Scolipede", "Whimsicott", "Lilligant", "Basculin", "Basculin-Blue-Striped", "Krookodile", "Darmanitan", "Maractus", "Crustle", "Scrafty", "Sigilyph", "Cofagrigus", "Carracosta", "Archeops", "Garbodor", "Zoroark", "Cinccino", "Gothitelle", "Reuniclus", "Swanna", "Vanilluxe", "Sawsbuck", "Emolga", "Escavalier", "Amoonguss", "Jellicent", "Alomomola", "Galvantula", "Ferrothorn", "Klinklang", "Eelektross", "Beheeyem", "Chandelure", "Haxorus", "Beartic", "Cryogonal", "Accelgor", "Stunfisk", "Mienshao", "Druddigon", "Golurk", "Bisharp", "Bouffalant", "Braviary", "Mandibuzz", "Heatmor", "Durant", "Hydreigon", "Volcarona", "Cobalion", "Terrakion", "Virizion", "Tornadus", "Tornadus-Therian", "Thundurus", "Thundurus-Therian", "Reshiram", "Zekrom", "Landorus", "Landorus-Therian", "Kyurem", "Kyurem-Black", "Kyurem-White", "Keldeo", "Meloetta", "Genesect", "Chesnaught", "Delphox", "Greninja", "Diggersby", "Talonflame", "Vivillon", "Pyroar", "Florges", "Gogoat", "Pangoro", "Furfrou", "Meowstic", "Meowstic-F", "Aegislash", "Aromatisse", "Slurpuff", "Malamar", "Barbaracle", "Dragalge", "Clawitzer", "Heliolisk", "Tyrantrum", "Aurorus", "Sylveon", "Hawlucha", "Dedenne", "Carbink", "Goodra", "Klefki", "Trevenant", "Gourgeist", "Gourgeist-Small", "Gourgeist-Large", "Gourgeist-Super", "Avalugg", "Noivern", "Xerneas", "Yveltal", "Zygarde", "Zygarde-10%", "Diancie", "Hoopa", "Hoopa-Unbound", "Volcanion", "Decidueye", "Incineroar", "Primarina", "Toucannon", "Gumshoos", "Vikavolt", "Crabominable", "Oricorio", "Oricorio-Pom-Pom", "Oricorio-Pa'u", "Oricorio-Sensu", "Ribombee", "Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk", "Wishiwashi", "Toxapex", "Mudsdale", "Araquanid", "Lurantis", "Shiinotic", "Salazzle", "Bewear", "Tsareena", "Comfey", "Oranguru", "Passimian", "Golisopod", "Palossand", "Minior", "Komala", "Turtonator", "Togedemaru", "Mimikyu", "Bruxish", "Drampa", "Dhelmise", "Kommo-o", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Solgaleo", "Lunala", "Nihilego", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Necrozma-Dusk-Mane", "Necrozma-Dawn-Wings", "Magearna", "Marshadow", "Naganadel", "Stakataka", "Blacephalon", "Zeraora", "Melmetal", "Syclant", "Revenankh", "Pyroak", "Fidgit", "Stratagem", "Arghonaut", "Kitsunoh", "Cyclohm", "Colossoil", "Krilowatt", "Voodoom", "Tomohawk", "Necturna", "Mollux", "Aurumoth", "Malaconda", "Cawmodore", "Volkraken", "Plasmanta", "Naviathan", "Crucibelle", "Kerfluffle", "Pajantom", "Jumbao", "Caribolt", "Smokomodo", "Snaelstrom", "Equilibra"];
				let mons = [];
				for (let x = 0; x < validPokemon.length; x++) {
					let frame = this.getTemplate(validPokemon[x]);
					if (!(weaknesses.includes(frame.types[0]) || (frame.types[1] && weaknesses.includes(frame.types[1])))) continue;
					mons.push(validPokemon[x]);
				}
				if (!mons) return;
				const chosen = mons[this.random(mons.length)];
				const generator = new RandomStaffBrosTeams('gen7randombattle', this.prng);
				let set = generator.randomSet(chosen, '[silent]');
				let setSpecies = set.species;
				let setAbility = set.ability;
				if (this.getItem(set.item).megaStone) {
					setSpecies = set.species + "-Mega";
					setAbility = this.getTemplate(setSpecies).abilities[0];
				} else if (this.getItem(set.item).id === "ultranecroziumz") {
					setSpecies = "Necrozma-Ultra";
					setAbility = "Neuroforce";
				} else if (this.getAbility(set.ability).id === "battlebond") {
					setSpecies = "Greninja-Ash";
				} else if (this.getAbility(set.ability).id === "powerconstruct") {
					setSpecies = "Zygarde-Complete";
				}
				pokemon.formeChange(setSpecies);
				for (let newMove of set.moves) {
					let moveTemplate = this.getMove(newMove);
					if (pokemon.moves.includes(moveTemplate.id)) continue;
					if (moveTemplate.name.includes("Hidden Power")) pokemon.hpType = moveTemplate.name.substring(13);
					pokemon.moveSlots.push({
						move: moveTemplate.name,
						id: moveTemplate.id,
						pp: 5,
						maxpp: 5,
						target: moveTemplate.target,
						disabled: false,
						disabledSource: '',
						used: false,
					});
				}
				let statName = 'atk';
				let bestStat = 0;
				/** @type {StatNameExceptHP} */
				let s;
				for (s in pokemon.storedStats) {
					if (pokemon.storedStats[s] > bestStat) {
						if (s === 'spe') continue;
						statName = s;
						bestStat = pokemon.storedStats[s];
					}
				}
				this.boost({[statName]: 1, spe: 1}, pokemon);
				this.add('-ability', pokemon, setAbility, '[silent]');
				pokemon.setAbility(setAbility);
			}
		},
	},
	// A
	arcanetactics: {
		desc: "Adds a fifth move to the user of Thunderbolt, Ice Beam, or Flamethrower. All neutral hits do 25% less damage.",
		shortDesc: "Adds Tbolt, Ice Beam, or Flamethrower. Neutral = 75%.",
		id: "arcanetactics",
		name: "Arcane Tactics",
		isNonstandard: "Custom",
		onSourceBasePowerPriority: 7,
		onSourceBasePower(basePower, attacker, defender, move) {
			let not_neutral = ['Ghost', 'Poison', 'Steel', 'Fighting', 'Psychic', 'Dragon'];
			if (!not_neutral.includes(move.type)) {
				return this.chainModify(0.75);
			}
		},
	},
	// ArchasTL
	"afk": {
		shortDesc: "User transforms into ArchasTL at half health.",
		id: "afk",
		name: "AFK",
	},
	// A Phantom
	"phantomflex": {
		shortDesc: "This Pokemon's Ghost moves have priority raised by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Ghost') {
				return priority + 1;
			}
		},
		id: "phantomflex",
		name: "Phantom Flex",
	},
	// barton
	"vibrant": {
		shortDesc: "This Pokemon's Fairy moves have priority raised by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Fairy') {
				return priority + 1;
			}
		},
		id: "vibrant",
		name: "vibrant",
	},
	// BetaDog
	fluffypaws: {
		desc: "This Pokemon's Status moves have their priority increased by 1. Defense doubled.",
		shortDesc: "Prankster + Fur Coat",
		id: "fluffypaws",
		name: "Fluffy Paws",
		isNonstandard: "Custom",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.category === 'Status') return priority + 1;
		},
		onModifyDef(def) {
			return this.chainModify(2);
		},
	},
	// brownisaur
	"sweetdisguise": {
		desc: "If this Pokemon is a Bulbasaur, the first hit it takes in battle deals 0 neutral damage. Its disguise is then broken. Confusion damage also breaks the disguise.",
		shortDesc: "If this Pokemon is a Bulbasaur, the first hit it takes in battle deals 0 neutral damage.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && ['bulbasaur'].includes(target.template.speciesid) && !target.transformed && target.happiness === 255) {
				this.add('-activate', target, 'ability: Sweet Disguise');
				this.effectData.busted = true;
				return 0;
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.happiness === 254 || !['bulbasaur'].includes(target.template.speciesid) || target.transformed || (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates))) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['bulbasaur'].includes(pokemon.template.speciesid) && this.effectData.busted) {
				pokemon.happiness = 254;
			}
		},
		id: "sweetdisguise",
		name: "Sweet Disguise",
	},
	// CJtheGold
	shadownerd: {
		desc: "This Pokemon's Attack & Speed are raised by 1 stage if hit by a Dark- or Ghost-type attack.",
		shortDesc: "+1 Atk/Spe if hit by a Dark- or Ghost-type attack.",
		onAfterDamage(damage, target, source, effect) {
			if (effect && (effect.type === 'Dark' || effect.type === 'Ghost')) {
				this.boost({spe: 1, atk: 1});
			}
		},
		id: "shadownerd",
		name: "Shadow Nerd",
	},
	// fart
	heatrises: {
		desc: "Immunity to Fire- and Ground-type moves.",
		shortDesc: "Immunity to Fire- and Ground-type moves.",
		// Logia's type-changing itself is implemented in statuses.js
		id: "heatrises",
		name: "Heat Rises",
		isNonstandard: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Fire' || move.type === 'Ground')) {
				this.add('-immune', target, '[msg]', '[from] ability: Heat Rises');
				return null;
			}
		},
	},
	// Flare
	superillusion: {
		desc: "When this Pokemon switches in, it appears as the last unfainted Pokemon in its party until it takes supereffective direct damage from another Pokemon's attack. This Pokemon's actual level and HP are displayed instead of those of the mimicked Pokemon.",
		shortDesc: "This Pokemon appears as the last Pokemon in the party until it takes a supereffective hit.",
		id: "superillusion",
		name: "Super Illusion",
		isNonstandard: "Custom",
		isUnbreakable: true,
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			pokemon.illusion = pokemon.side.pokemon[i];
			let move = this.getMove(pokemon.side.pokemon[i].set.moves[3]);
			pokemon.moveSlots[3] = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			pokemon.types = pokemon.illusion.types;
		},
		onAfterDamage(damage, target, source, effect) {
			if (target.illusion && effect && effect.effectType === 'Move' && effect.id !== 'confused' && this.getEffectiveness(effect.type, target.getTypes()) > 0) {
				this.singleEvent('End', this.getAbility('Illusion'), target.abilityData, target, source, effect);
				target.types = ["Dark"];
				let move = this.getMove('Busted');
				target.moveSlots[3] = {
					move: move.name,
					id: move.id,
					pp: move.pp,
					maxpp: move.pp,
					target: move.target,
					disabled: false,
					used: false,
					virtual: true,
				};
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				pokemon.types = ["Dark"];
				let details = pokemon.template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
	},
	// hyruleEnigma
	"redtunic": {
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield; halves the power of Fire-type attacks against this Pokemon and halves burn damage.",
		shortDesc: "Stance Change + Heatproof + Prankster",
		onBeforeMove(attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			let targetSpecies = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.template.species !== targetSpecies) attacker.formeChange(targetSpecies);
		},
		onModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Red Tunic weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Red Tunic weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === '???') {
				this.debug('Red Tunic boost');
				return this.chainModify(1.5);
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
		},
		id: "redtunic",
		name: "Red Tunic",
	},
	// i want a lamp
	"flashdrive": {
		shortDesc: "This Pokemon's attacks that are not very effective on a target deal double damage.",
		onStart(pokemon) {
			let foespe = 0;
			let myspe = pokemon.getStat('spe', false, true);
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				foespe += target.getStat('spe', false, true);
			}
			if (foespe && foespe >= myspe) {
				this.boost({spe: 1});
			} else {
				this.boost({spa: 1});
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (move.typeMod < 0) {
				this.debug('Flashdrive boost');
				return this.chainModify(2);
			}
		},
		id: "flashdrive",
		name: "Flashdrive",
	},
	// Lumi Q
	jolthaymaker: {
		desc: "This Pokemon's punch-based attacks have their power multiplied by 2.",
		shortDesc: "This Pokemon's punch-based attacks have 2x power.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Jolt Haymaker boost');
				return this.chainModify(2);
			}
		},
		id: "jolthaymaker",
		name: "Jolt Haymaker",
	},
	// MajesticLucario
	"fallenwarriors": {
		shortDesc: "Ability gains effects of Adaptability & Serene Grace if all allies have fainted.",
		id: "fallenwarriors",
		name: "Fallen Warriors",
		onModifyMove(move, pokemon) {
			if (pokemon.side.pokemon.length === 1) {
				move.stab = 2;
			}
		},
	},
	// Tauon
	galewingsv1: {
		desc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		id: "galewingsv1",
		name: "Gale Wings v1",
		isNonstandard: "Custom",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	// Tenshi
	miraclesand: {
		desc: "If Sandstorm is active, this Pokemon's Speed and Defense are multiplied by 1.5. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's Spe/Def are 1.5x; immunity to Sandstorm.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onSwitchOut(pokemon) {
			pokemon.happiness = 255;
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onModifyDef(def) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		id: "miraclesand",
		name: "Miracle Sand",
	},
	// VanillaBobcat
	"foodcoma": {
		shortDesc: "This Pokemon skips every other turn instead of using a move.",
		onResidual(pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Persian' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.template.speciesid === 'persian') {
				pokemon.formeChange('Persian-Alola', this.effect, true, '[silent]');
			}
		},
		onStart(pokemon) {
			pokemon.removeVolatile('truant');
			if (pokemon.activeTurns && (pokemon.moveThisTurnResult !== undefined || !this.willMove(pokemon))) {
				pokemon.addVolatile('truant');
			}
		},
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
			pokemon.addVolatile('truant');
		},
		effect: {},
		id: "foodcoma",
		name: "Food Coma",
	},
	// yo boi arthurlis
	"harvestingsummer": {
		desc: "Half damage from Fire/Ice. 50% chance to respawn item. Weight doubled.",
		shortDesc: "Thick Fat / Heavy Metal / Harvest",
		onModifyWeight(weight) {
			return weight * 2;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.getItem(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			}
		},
		id: "harvestingsummer",
		name: "Harvesting Summer",
	},
};

exports.BattleAbilities = BattleAbilities;
