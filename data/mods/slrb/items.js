'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
	
	
	// fart
	fartiumz: {
		id: "fartiumz",
		name: "Fartium Z",
		isNonstandard: true,
		onTakeItem: false,
		zMove: "Soup-Stealing 7-Star Strike",
		zMoveFrom: "Soup Time!",
		zMoveUser: ["Kartana"],
		gen: 7,
		desc: "If held by a Kartana with Soup Time!, it can use Soup-Stealing 7-Star Strike.",
	},
	
	// SacredLatias
	dewofdewm: {
		id: "dewofdewm",
		name: "Dew of Dewm",
		isNonstandard: true,
		onTakeItem: false,
		onBasePower: function () {},
		onModifySpAPriority: 1,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.baseTemplate.num === 380 || pokemon.baseTemplate.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.num === 380 || pokemon.baseTemplate.num === 381) {
				return this.chainModify(1.5);
			}
		},
		gen: 7,
		desc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
	},
	
	"satsuma": {
		id: "satsuma",
		name: "Satsuma",
		spritenum: 242,
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onTerrain: function (pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.maxhp / 16);
		},
		gen: 2,
		desc: "At the end of every turn, holder restores 1/16 of its max HP.",
	},
	
	
	"distortedlens": {
		id: "distortedlens",
		name: "Distorted Lens",
		spritenum: 35,
		isNonstandard: true,
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.type === 'Fighting' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.25);
			}
			if (move.type === 'Ground' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.25);
			}
			if (move.type === 'Fire' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(0.25);
			}
			if (move.type === 'Normal' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(4);
			}
			if (move.type === 'Bug' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(8);
			}
			if (move.type === 'Rock' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(8);
			}
			if (move.type === 'Dragon' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(4);
			}
			if (move.type === 'Grass' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(4);
			}
			if (move.type === 'Ice' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(4);
			}
			if (move.type === 'Dark' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(4);
			}
			if (move.type === 'Steel' && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				this.debug('-50% reduction');
				this.add('-enditem', target, this.effect, '[weaken]');
				return this.chainModify(4);
			}
		},
		desc: "If held by a Lucario, inverts type effectiveness of damage received.",
	},
};

exports.BattleItems = BattleItems;
