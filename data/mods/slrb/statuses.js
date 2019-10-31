'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
	/*
	// Example:
	userid: {
		noCopy: true,
		onStart() {
			this.add(`c|+Username|Switch In Message`);
		},
		onSwitchOut() {
			this.add(`c|+Username|Switch Out Message`);
		},
		onFaint() {
			this.add(`c|+Username|Faint Message`);
		},
		// Innate effects go here
	},
	*/
	// Please keep statuses organized alphabetically based on staff member name!

	a: {
		noCopy: true,
		onStart(target, source) {
			this.add('-start', source, 'typechange', `Psychic/Fairy`);
			this.add(`c|%A|This'll be **A** fun one!`);
		},
		onSwitchOut() {
			this.add(`c|%A|I'm gonna take **A** break for now.`);
		},
		onFaint() {
			this.add(`c|%A|oof`);
		},
	},
	aphantom: {
		noCopy: true,
		onStart(target, source) {
			this.add(`c| A Phantom|/me used Phantom Force!`);
		},
		onSwitchOut() {
			this.add(`c| A Phantom|/me pulls down your pants and runs!`);
		},
		onFaint() {
			this.add(`c| A Phantom|neat`);
		},
	},
	afkrchastl: {
		noCopy: true,
		onStart() {
			//this.add(`c|+Kaiju Bunny|Hey there! Good luck!`);
		},
		onSwitchOut() {
			//this.add(`c|+Kaiju Bunny|Don't keep her from battling for too long!`);
		},
		onFaint() {
			//this.add(`c|+Kaiju Bunny|She tried her best... ;;`);
		},
		// Kaiju Rage Innate
		// onUpdate so toxic orb can activate after. Code mainly copied from Power Construct.
		onUpdate(pokemon) {
			if (pokemon.template.speciesid !== 'lilligant' || pokemon.transformed || pokemon.illusion || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: no longer AFK');
			pokemon.formeChange('Arceus-Ghost', this.effect, true);
			pokemon.name = 'ArchasTL';
         pokemon.id = pokemon.side.id+": ArchasTL";
         pokemon.fullname = pokemon.side.id+": ArchasTL";
			pokemon.illusion = pokemon; // name change
         this.add('replace', pokemon, pokemon.getDetails); // name change
			pokemon.illusion = null;
			let newHP = Math.floor(Math.floor(2 * pokemon.template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			pokemon.heal(pokemon.maxhp / 4);
			pokemon.types = ["Ghost", "Grass"]
			this.add('-heal', pokemon, pokemon.getHealth);
			this.add('-message', pokemon.name + '\ finally got it going!');
		},
	},
	arceus: {
		name: 'Arceus',
		id: 'arceus',
		num: 493,
		onTypePriority: 1,
		onType(types, pokemon) {
			return ["Ghost", "Grass"];
		},
	},
	betadog: {
		noCopy: true, 
		onStart() {
			this.add(`c|+BetaDog|Oh, hi! I brought some blankets!`);
		},
		onSwitchOut() {
			this.add(`c|+BetaDog|BRB getting blankets`);
		},
		onFaint() {
			this.add(`c|+BetaDog|Not enough blankets?`);
		},
	},
	bigboyteddy: {
		noCopy: true, 
		onStart() {
			this.add(`c| Big Boy Teddy|Did someone say muffin?`);
		},
		onSwitchOut() {
			this.add(`c| Big Boy Teddy|gtg, luv u all! except u Moxie Latios >:(`);
		},
		onFaint() {
			this.add(`c| Big Boy Teddy|where da muffin at? :(`);
		},
	},
	barton: {
		noCopy: true, 
		onStart() {
			this.add(`c|+barton|ESKETIT`);
		},
		onSwitchOut() {
			this.add(`c|+barton|peace y'all`);
		},
		onFaint() {
			this.add(`c|+barton|drat`);
		},
	},
	brownisaur: {
		noCopy: true, 
		onStart(source) {
			source.types = ['Fairy', 'Psychic'];
			this.add('-start', source, 'typechange', `Fairy/Psychic`);
			this.add(`c|@browni☿️saur|hug first, ask questions later.`);
		},
		onSwitchOut() {
			this.add(`c|@browni☿️saur|that wasn't very nice ;-;`);
		},
		onFaint() {
			this.add(`c|@browni☿️saur|should have banned you when I had the chance`);
		},
	},
	brucewee: {
		noCopy: true, 
		onStart() {
			this.add(`c| BruceWee|I like trains`);
		},
		onSwitchOut() {
			this.add(`c| BruceWee|ye`);
		},
		onFaint() {
			this.add(`c| BruceWee|weird flex but ok`);
		},
	},
	cjthegold: {
		noCopy: true,
		onStart(target, source) {
			this.add(`c| CJtheGold ☯|Hello there, General CJ`);
		},
		onSwitchOut() {
			this.add(`c| CJtheGold ☯|Behold the power of gold when it returns...`);
		},
		onFaint() {
			this.add(`c| CJtheGold ☯|Cya nerds <3`);
		},
	},
	elenabonita: {
		noCopy: true,
		onStart(target, source) {
			this.add(`c| Elena Bonita|Hugs for everyone <3`);
		},
		onSwitchOut() {
			this.add(`c| Elena Bonita|brb hitting the gym`);
		},
		onFaint() {
			this.add(`c| Elena Bonita|Love hurts </3>`);
		},
	},
	fart: {
		noCopy: true,
		onStart(target, source) {
			this.add('-start', source, 'typechange', `Fairy/Steel`);
			this.add(`c|#fart|it's fukken raw`);
		},
		onSwitchOut() {
			this.add(`c|#fart|this boy is not correct. he is **flawed.**`);
		},
		onFaint() {
			this.add(`c|#fart|the things I do for love...`);
		},
	},
	geoffbruedly: {
		noCopy: true,
		onStart(target, source) {
			this.add(`c| GeoffBruedly|I am the one... who lost his soul... I am the one who'll be the last one standing`);
		},
		onSwitchOut() {
			this.add(`c| GeoffBruedly|time to surrender like the French`);
		},
		onFaint() {
			this.add(`c| GeoffBruedly|I never saw France!`);
		},
	},
	hostjoe: {
		noCopy: true, 
		onStart() {
			this.add(`c|@Host Joe|Im about to crack open a cold one, Boy!`);
		},
		onSwitchOut() {
			this.add(`c|@Host Joe|I'm trying, Jennifer!`);
		},
		onFaint() {
			this.add(`c|@Host Joe|Cavs in 7`);
		},
	},
	hyruleenigma: {
		noCopy: true, 
		onStart() {
			this.add(`c|%hyruleEnigma|Ahoy, Lobby!`);
		},
		onSwitchOut() {
			this.add(`c|%hyruleEnigma|If only I were Dunsparce...`);
		},
		onFaint() {
			this.add(`c|%hyruleEnigma|I should've buffed Sword Beam.`);
		},
	},
	iwantalamp: {
		noCopy: true, 
		onStart() {
			this.add(`c| i want a lamp|WHERE IS MY LAMP`);
		},
		onSwitchOut() {
			this.add(`c| i want a lamp|hold on, i think ive found my lamp`);
		},
		onFaint() {
			this.add(`c| i want a lamp|ZZzzzZZzZzZZZlampzZZzZZzZ`);
		},
	},
	krookies: {
		noCopy: true, 
		onStart() {
			this.add(`c| Krookies|I love all of you!`);
		},
		onSwitchOut() {
			this.add(`c| Krookies|Im gonna go eat some potatoes brb`);
		},
		onFaint() {
			this.add(`c| Krookies|Dying is bad for your health :c`);
		},
	},
	"lumiq": {
		noCopy: true, 
		onStart() {
			this.add(`c|%Lumi Q|Fly like a butterfly; sting like me C;<`);
		},
		onSwitchOut() {
			this.add(`c|%Lumi Q|Tag out!`);
		},
		onFaint() {
			this.add(`c|%Lumi Q|ded`);
		},
	},
	marukomuru: {
		noCopy: true, 
		onStart(target) {
			this.add(`c| Marukomuru|Welcome to the Lobby :DDDD`);
			if (target.illusion) return;
			this.boost({atk: 2}, target);
		},
		onSwitchOut() {
			this.add(`c| Marukomuru|I was supposed to have a quote here for if I get switched out, but wasn't aware of that being a thing in the first place; this placeholder text will have to do.`);
		},
		onFaint() {
			this.add(`c| Marukomuru|So you don't have a favorite pony? :C`);
		},
	},
	mdpikachu: {
		noCopy: true, 
		onStart() {
			this.add(`c| MdPikachu|Will I be a voice if I report enough people?`);
		},
		onSwitchOut() {
			this.add(`c| MdPikachu|Nope, nope, I want none of this!`);
		},
		onFaint() {
			this.add(`c| MdPikachu|This is fair and balanced!`);
		},
	},
	mobilegreennamed: {
		noCopy: true, 
		onStart() {
			this.add(`c| MobileGreenNamed|Time for my daily ran-oh wait! We're battling?`);
		},
		onSwitchOut() {
			this.add(`c| MobileGreenNamed|/me jumps out window`);
		},
		onFaint() {
			this.add(`c| MobileGreenNamed|X_X`);
		},
	},
	moxielatios: {
		noCopy: true,
		onStart(target, source) {
			this.add(`c|+Moxie ♥ Latios|Latios does get moxie idiot.`);
		},
		onSwitchOut() {
			this.add(`c|+Moxie ♥ Latios|I need to find where I asked for your opinion, one second.`);
		},
		onFaint() {
			this.add(`c|+Moxie ♥ Latios|My Lobby needs me.`);
		},
	},
	megalatios: {
		noCopy: true,
		onStart(target, source) {
			this.add('-start', source, 'typechange', `Dragon/Ground`);
		},
	},
	mustard: {
		noCopy: true, 
		onStart() {
			this.add(`c|@mustard|hi`);
		},
		onSwitchOut() {
			this.add(`c|@mustard|Hell yeah, brother! Cheers from Iraq!`);
		},
		onFaint() {
			this.add(`c|@mustard|Unluckeee`);
		},
	},
   rYGLY: {
		noCopy: true,
		onStart() {
			this.add(`c|@rYGLY|(Here come dat boi`);
		},
		onSwitchOut() {
			this.add(`c|@rYGLY|Gottem`);
		},
		onFaint() {
			this.add(`c|@rYGLY|poor monkey ;-;`);
		},
	},
   sacredlatias: {
       noCopy: true,
       onStart() {
           this.add(`c|%SacredLatias|Latias for ag, just saying.`);
       },
       onSwitchOut() {
           this.add(`c|%SacredLatias|Come onnnn, I coulda taken one more hit!`);
       },
       onFaint() {
           this.add(`c|%SacredLatias|Them spoopnoodles finally got the best of me...`);
       },
   },
	// Cant use the exact name because its a pokemon's name
	servinesuser: {
		noCopy: true,
		onStart() {
			this.add(`c| Servine|You're going to regret this \\hah pessimism\\`);
		},
		onSwitchOut() {
			this.add(`c| Servine|Let me help you with your baggage.`);
		},
		onFaint() {
			this.add(`c| Servine|eat pant`);
		},
},
	tenshi: {
		noCopy: true, 
		onStart() {
			this.add(`c|@Tenshi|Praise Be Puppy Jesus`);
		},
		onSwitchOut() {
			this.add(`c|@Tenshi|/me borks at a distance`);
		},
		onFaint() {
			this.add(`c|@Tenshi|Growl Bork Bork :C`);
		},
	},
	pinkdragontamer: {
		noCopy: true, 
		onStart() {
			this.add(`c|%pinkdragontamer|i got 3 heads bitch`);
		},
		onSwitchOut() {
			this.add(`c|%pinkdragontamer|im out this bih`);
		},
		onFaint() {
			this.add(`c|%pinkdragontamer|!faq you`);
		},
	},
	polestarobey: {
		noCopy: true, 
		onStart() {
			this.add(`c| Polestar Obey|let's get this going!`);
			this.add(`c| Polestar Obey|here comes my strongest and best friend!`);
		},
		onSwitchOut() {
			this.add(`c| Polestar Obey|I'll return you for now.`);
		},
		onFaint() {
			this.add(`c| Polestar Obey|My friends, I mourn you`);
		},
	},
	pokemondeadchannel: {
		noCopy: true, 
		onStart(source) {
			this.add(`c|+PokemonDeadChannel|/me changes names`);
		},
		onSwitchOut() {
			this.add(`c|+PokemonDeadChannel|>im not broken`);
			this.add(`c|+PokemonDeadChannel|ok guess I gotta buff myself :^)`);
		},
		onFaint() {
			this.add(`c|+PokemonDeadChannel|bullies :(`);
		},
	},
	flare: {
		noCopy: true,
		onStart(target, source) {
			this.add(`c|@Flare|Behold my sexy hair`);
		},
		onSwitchOut() {
			this.add(`c|@Flare|I'll be back by February 30th`);
		},
		onFaint() {
			this.add(`c|@Flare|Shit! I've been busted!`);
		},
	},
	vanillabobcat: {
		noCopy: true, 
		onStart(pokemon) {
			let foe = pokemon.side.foe.active[0];
			if (foe.name === "Tenshi") {
				this.add(`c|‽VanillaBobcat|My hair is purrrrfect, unlike yours Furfrou.`);
			} else if (foe.name === "bidoferz") {
				this.add(`c|‽VanillaBobcat|this cheeky bidoof nicked me barbie`);
			} else {
				this.add(`c|‽VanillaBobcat|Game of Thrones is a terrible show.`);
			}
		},
		onSwitchOut() {
			this.add(`c|‽VanillaBobcat|=(O w O)=`);
		},
		onFaint() {
			this.add(`c|‽VanillaBobcat|[[shoutouts to my squad]]`);
		},
	},
	yoboiarthurlis: {
		noCopy: true,
		onStart(target, source) {
			this.add('-start', source, 'typechange', `Grass/Rock`);
			this.add(`c| yo boi arthurlis|Been a long time, kiddo.... wanna have a bad time?`);
		},
		onSwitchOut() {
			this.add(`c| yo boi arthurlis|smell your memes later`);
		},
		onFaint() {
			this.add(`c| yo boi arthurlis|__**call zun**__`);
		},
	},
	leffect: {
		name: 'L',
		id: 'leffect',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'lockedmove') {
				this.add('-start', target, 'l', '[fatigue]');
			} else {
				this.add('-start', target, 'l');
			}
			this.effectData.time = this.random(2, 6);
		},
		onEnd(target) {
			this.add('-end', target, 'l');
		},
		onModifyMovePriority: -2,
		onModifyMove(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = pokemon.set.shiny && pokemon.types[1] || pokemon.types[0];
			}
		},
	},
};

exports.BattleStatuses = BattleStatuses;
