var iFileName = "ua_20200206_Subclasses-Part-3.js";
RequiredSheetVersion(13);
// This file adds the content from the Unearthed Arcana 2020: Subclasses, Part 3 article to MPMB's Character Record Sheet

// Define the source
SourceList["UA:SP3"] = {
	name : "Unearthed Arcana: Subclasses, Part 3",
	abbreviation : "UA:SP3",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2020/dnd/downloads/UA2020-Subclasses03_0224.pdf",
	date : "2020/02/24"
};



AddSubClass("druid", "circle of the stars-ua", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*circle)(?=.*stars).*$/i,
	subname : "Circle of the Stars",
	source : [["UA:SP3", 3]],
	features : {
		"subclassfeature2" : {
			name : "Star Map",
			source : [["UA:SP3", 3]],
			minlevel : 2,
			description : desc([
				"I've created a star map, a Tiny object which I can use as my spellcasting focus",
				"If I lose it, I can preform a 1-hour ceremony during a rest to create a replacement",
				"I can use it to cast Augury or Guiding Bolt, even unprepared, without using a spell slot"
			]),
			spellcastingBonus : {
				name : "Star Map",
				spells : ["guiding bolt", "augury"],
				selection : ["guiding bolt", "augury"],
				firstCol : "Sp",
				times: 2
			},
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature2.1" : {
			name : "Starry Form",
			source : [["UA:SP3", 3]],
			minlevel : 2,
			description : desc([
				"As an action, I can expend a use of wild shape to take on a starry form for 10 minutes",
				"In that form I shed bright light in a 10-ft radius and dim light for an extra 10-ft radius",
				"When I do so, I choose one constellation below to grant me benefits in my starry form:",
				"\u2022 Chalice: When I use a spell slot to cast a healing spell, I also heal a creature in 30 ft",
				"  This can be myself or the original target; I restore 1d8 + half my druid level in HP",
				"\u2022 Archer: As a bonus action, I can make a ranged spell attack to hurl a luminous arrow",
				"  This has a range of 60 ft and deals radiant damage equal to 1d8 + my Wisdom mod",
				"\u2022 Dragon: I can treat a roll below 10 as a 10 for Int/Wis checks and concentration saves"
			]),
			action : [["bonus action", " (Archer Constellation)"]],
			additional : levels.map(function (n) {
				return n < 2 ? "" : "Chalice: heals 1d8+" + Math.floor(n/2) + " HP";
			}),
			weaponOptions : {
				regExpSearch : /^(?=.*luminous)(?=.*arrow).*$/i,
				name : "Luminous Arrow",
				source : [["UA:SP3", 3]],
				ability : 5,
				type : "Spell",
				damage : [1, 8, "radiant"],
				range : "60 ft",
				description : "Use as bonus action",
				abilitytodamage : true
			},
			weaponsAdd : ['Luminous Arrow']
		},
		"subclassfeature6" : {
			name : "Cosmic Omen",
			source : [["UA:SP3", 3]],
			minlevel : 6,
			description : desc([
				"When I finish a long rest, I can roll a die to gain an omen based on the result (odd/even)",
				"As a reaction when a creature I can see in 30 ft makes an attack, check, or save, I can:",
				"\u2022 Weal (even): add 1d6 to the number rolled for the attack, check, or save",
				"\u2022 Woe (odd): subtract 1d6 from the number rolled for the attack, check, or save"
			]),
			action : [["reaction", ""]],
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Full of Stars",
			source : [["UA:SP3", 3]],
			minlevel : 10,
			description : "\n   While in my starry form, I have resistance to bludgeoning, piercing, and slashing damage",
			dmgres : [
				["Bludgeoning", "Bludgeon. (in form)"],
				["Piercing", "Piercing (in form)"],
				["Slashing", "Slashing (in form)"]
			],
			extraname : "Circle of the Stars 14",
			"star flare" : {
				name : "Star Flare",
				source : [["UA:SP3", 3]],
				description : desc([
					"As an action, I conjure a 30-ft radius sphere of light on a point within 120 ft I can see",
					"I then teleport each willing creature in that sphere to an empty space within 30 ft of it",
					"Creatures left within the sphere must make a Con save or take 4d10 radiant damage",
					"Those that failed the save are also blinded until the end of my next turn",
					"I can do this once per long rest, or by expending a 5th-level or higher spell slot (SS 5+)"
				]),
				action : [["action", ""]],
				usages : 1,
				recovery : "long rest",
				altResource : "SS 5+"
			},
			autoSelectExtrachoices : [{
				extrachoice : "star flare",
				minlevel : 14
			}]
		},
	}
});

var rangerSubclassFeyWandererUA = AddSubClass("ranger", "fey wanderer-ua", {
	regExpSearch : /^(?=.*fey)(?=.*wanderer).*$/i,
	subname : "Fey Wanderer",
	source : [["UA:SP3", 5]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	fullname : "Fey Wanderer",
	features : {
		"subclassfeature3" : {
			name : "Fey Wanderer Magic",
			source : [["UA:SP3", 5]],
			minlevel : 3,
			description : "\n   I get bonus spells known, which do not count against the number of spells I can know",
			spellcastingExtra : ["charm person", "misty step", "dispel magic", "banishment", "mislead"],
			spellcastingExtraApplyNonconform : true
		},
		"subclassfeature3.1" : {
			name : "Cunning Will",
			source : [["UA:SP3", 5]],
			minlevel : 3,
			description : "\n   Adv. on saves vs. charm/frightened; Proficiency in Deception, Performance, or Persuasion",
			skillstxt : "Choose one from: Deception, Performance, or Persuasion",
			savetxt : { adv_vs : ["charmed", "frightened"] }
		},
		"subclassfeature3.2" : {
			name : "Dreadful Strikes",
			source : [["UA:SP3", 5]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can imbue the weapons I'm holding with magic until my turn ends",
				"They count as magical and deal +1d6 psychic damage, but only once to a single creature",
				"I can also do this as part of the same bonus action as making an off-hand attack"
			]),
			action : [["bonus action", ""]]
		},
		"subclassfeature7" : {
			name : "Blessings of the Courts",
			source : [["UA:SP3", 5]],
			minlevel : 7,
			description : desc([
				"Once per turn when I hit a weapon attack, I can expend a spell slot for extra damage",
				"The target takes +3d6 psychic damage and must make a Wis save or be frightened of me",
				"This lasts until the end of my next turn; In addition, I add my Wis mod to Cha checks"
			]),
			addMod : ["Deception", "Intimidation", "Performance","Persuasion"].map(function(skill){return {type : "skill", field : skill, mod : "Wis", text : "I add my Wisdom modifier to my Charisma checks"};})
		},
		"subclassfeature11" : {
			name : "Beguiling Twist",
			source : [["UA:SP3", 6]],
			minlevel : 11,
			description : desc([
				"As a reaction when a creature I can see in 120 ft succeeds a save vs. charmed/frightened",
				"I can have another I can see in 120 ft make a Wis save or suffer one effect of my choice:",
				" \u2022 For 1 min, it's frightened of me or charmed; It can save again at the end of its turns",
				" \u2022 It takes 3d10 psychic damage"
			]),
			action : [["reaction", ""]],
			extraname : "Fey Wanderer 15",
			"misty presence" : {
				name : "Misty Presence",
				source : [["UA:SP3", 6]],
				description : desc([
					"As a bonus action, I can have a creature I can see within 30 ft make a Wisdom save",
					"On a failed save, it cannot see or hear me for 24 hours or until I use this feature again",
					"The target can repeat its save if I hit it with an attack, force it to save, or deal it damage",
					"On a successful save, the creature is immune to my use of this feature for 7 days",
					"I can do this once per long rest, or by expending a 4th-level or higher spell slot (SS 4+)"
				]),
				action : [["bonus action", ""]],
				usages : 1,
				recovery : "long rest",
				altResource : "SS 4+"
			},
			autoSelectExtrachoices : [{
				extrachoice : "misty presence",
				minlevel : 15
			}]
		}
	}
});
if (ClassList.rangerua) { ClassList.rangerua.subclasses[1].push(rangerSubclassFeyWandererUA); };
