-- ClassicArmory
-- David Whynot
-- v0.1


-- GLOBALS

-- local CAITEM_SLOT_FRAMES = {
-- 	CharacterRangedSlot
-- }

-- async function generator
local async = function ()
	local M = {}
	
	function M.waterfall(tasks, cb)
		local nextArg = {}
		for i, v in pairs(tasks) do
			local error = false
			v(function(err, ...)
				local arg = {...}
				nextArg = arg;
				if err then
					error = true
				end
			end, unpack(nextArg))
			if error then return cb("error") end
		end
		cb(nil, unpack(nextArg))
	end
	
	function M.eachSeries(arr, iterator, callback)
		
	end
	return M
end


local debug = false;
local hasBiznicks = false;
local hasBiznicksBeenChecked = false;

local slotNames = {
	"HeadSlot",
	"NeckSlot",
	"ShoulderSlot",
	"BackSlot",
	"ChestSlot",
	"ShirtSlot",
	"TabardSlot",
	"WristSlot",
	"HandsSlot",
	"WaistSlot",
	"LegsSlot",
	"FeetSlot",
	"Finger0Slot",
	"Finger1Slot",
	"Trinket0Slot",
	"Trinket1Slot",
	"MainHandSlot",
	"SecondaryHandSlot",
	"RangedSlot",
	"AmmoSlot",
	"Bag0Slot",
	"Bag1Slot",
	"Bag2Slot",
	"Bag3Slot"
}

local slotNamesLengthMinusOne = table.getn(slotNames) - 1;


function classicArmoryInit()
	-- export data frame
		local exportDataFrame = CreateFrame("Frame", "exportDataFrame", UIParent);

		exportDataFrame:SetFrameStrata("BACKGROUND");
		exportDataFrame:SetWidth(310);
		exportDataFrame:SetHeight(85);

		exportDataFrame:SetBackdrop({
			bgFile = "Interface/Tooltips/UI-Tooltip-Background", 
			edgeFile = "Interface/Tooltips/UI-Tooltip-Border", 
			tile = true, tileSize = 16, edgeSize = 16, 
			insets = { left = 4, right = 4, top = 4, bottom = 4 }
		});
		exportDataFrame:SetBackdropColor(0,0,0,1);

		exportDataFrame:SetPoint("CENTER", 0, 0);

		exportDataFrame:Hide();

		-- help text
			local helpText = exportDataFrame:CreateFontString(nil, "OVERLAY", "GameFontNormal");
			helpText:SetPoint("TOP", 0, -10);
			helpText:SetText("Press ctrl-c to copy the text below.\nThen, press ctrl-v anywhere on\nwowclassicarmory.com to upload your character.");

		-- textbox
			local exportDataTextFrame = CreateFrame("EditBox", "exportDataTextFrame", exportDataFrame, "InputBoxTemplate");
			
			exportDataTextFrame:SetPoint("BOTTOMLEFT", exportDataFrame, "BOTTOMLEFT", 20, 10);
			exportDataTextFrame:SetWidth(165);
			exportDataTextFrame:SetHeight(25);

			exportDataTextFrame:SetScript("OnUpdate",
				function()
					exportDataTextFrame:HighlightText();
				end
			);
			
			exportDataTextFrame:SetScript("OnTextChanged",
				function()
					getJSON(
						function(json)
							exportDataTextFrame:SetText(json);
							exportDataTextFrame:HighlightText();
						end
					)
				end
			);

			exportDataTextFrame:SetScript("OnEditFocusGained",
			function()
					getJSON(
						function(json)
							exportDataTextFrame:SetText(json);
							exportDataTextFrame:HighlightText();
						end
					)
				end
			);

		-- close button
			local exportDataCloseButtonFrame = CreateFrame("Button", "exportDataCloseButtonFrame", exportDataFrame, "UIPanelButtonTemplate");
			exportDataCloseButtonFrame:SetID(1);

			exportDataCloseButtonFrame:SetPoint("BOTTOMRIGHT", exportDataFrame, "BOTTOMRIGHT", -10, 10);
			exportDataCloseButtonFrame:SetWidth(75);
			exportDataCloseButtonFrame:SetHeight(25);

			exportDataCloseButtonFrame:SetText('Close');

			exportDataCloseButtonFrame:SetScript("OnClick",
				function()
					exportDataFrame:Hide();
				end
			);


	-- export button
		local exportButtonFrame = CreateFrame("Button", "exportButtonFrame", PaperDollFrame, "UIPanelButtonTemplate");
		exportButtonFrame:SetID(1);

		exportButtonFrame:SetPoint("TOPRIGHT", PaperDollFrame, "TOPRIGHT", -40, -45);
		exportButtonFrame:SetWidth(75);
		exportButtonFrame:SetHeight(25);

		exportButtonFrame:SetText('Upload');

		exportButtonFrame:SetScript("OnClick",
			function()
				getJSON(
					function(json)
						exportDataFrame:Show();
						exportDataTextFrame:SetText(json);
						exportDataTextFrame:HighlightText();
					end
				)
			end
		);

end


function getJSON(jsonCallback)
	hasBiznicks = false;
	hasBiznicksBeenChecked = false;
	
	local nameFunction = function(callback, asyncVals)
		asyncVals.name = UnitName("player");
		callback(nil, asyncVals);
	end
	local realmFunction = function(callback, asyncVals)
		asyncVals.realm = GetRealmName();
		callback(nil, asyncVals);
	end
	local raceFunction = function(callback, asyncVals)
		asyncVals.race = UnitRace("player");
		callback(nil, asyncVals);
	end
	local levelFunction = function(callback, asyncVals)
		asyncVals.level = UnitLevel("player");
		callback(nil, asyncVals);
	end
	local sexFunction = function(callback, asyncVals)
		asyncVals.sex = UnitSex('player');
		callback(nil, asyncVals);
	end
	local classFunction = function(callback, asyncVals)
		asyncVals.class = UnitClass("player");
		callback(nil, asyncVals);
	end
	local guildFunction = function(callback, asyncVals)
		asyncVals.guild = GetGuildInfo("player");
		callback(nil, asyncVals);
	end
	local moneyFunction = function(callback, asyncVals)
		asyncVals.money = GetMoney();
		callback(nil, asyncVals);
	end


	local asyncFunctions = {
		function(callback)
			callback(null, {});
		end,
		nameFunction,
		realmFunction,
		raceFunction,
		levelFunction,
		sexFunction,
		classFunction,
		guildFunction,
		moneyFunction,
		getItems,
		getStats,
		getSkills,
		getPvp,
		getRep,
		getBuffs,
		getDebuffs
	};

	async().waterfall(asyncFunctions, function(err, result)
		if err then
			print(err)
		else
			local items, stats, skills, rep, buffs, debuffs = unpack(result);

			result.v = '1.0.0';
			result.type = 'player';
			result.xp = {
				current = UnitXP('player'),
				max = UnitXPMax('player')
			};

			jsonCallback(ttjson(result, false));
		end
	end);

end


function getItems(callback, asyncVals)
	local items = {};

	for i = 1, table.getn(slotNames) do
		local isRangedSlot = slotNames[i] == 'RangedSlot';
		local slotId = GetInventorySlotInfo(slotNames[i]);
		local itemId = GetInventoryItemID("player", slotId);
		local itemLink = GetInventoryItemLink('player', itemId);
		local itemEnchant = nil;

		if isRangedSlot then hasBiznicksBeenChecked = true end
		
		if itemLink then
			local itemName, itemStringLink = GetItemInfo(itemLink);

			if itemStringLink then
				local _, _, Color, Ltype, Id, Enchant, Gem1, Gem2, Gem3, Gem4, Suffix, Unique, LinkLvl, Name = string.find(itemStringLink,
				"|?c?f?f?(%x*)|?H?([^:]*):?(%d+):?(%d*):?(%d*):?(%d*):?(%d*):?(%d*):?(%-?%d*):?(%-?%d*):?(%d*):?(%d*):?(%-?%d*)|?h?%[?([^%[%]]*)%]?|?h?|?r?")
				if isRangedSlot and (Enchant == 2523) then
					hasBiznicks = true;
				end
			end
		end

		items[i] = {
			slot = slotNames[i],
			item = itemId,
			enchant = itemEnchant,
			name = itemName
		};
	end

	asyncVals.items = items;
	callback(nil, asyncVals);
end


function getRep(callback, asyncVals)
	local numReps = GetNumFactions();

	-- expand all rep headers
	for i = 1, numReps do
		local _, _, _, _, _, _, _, _, _, isCollapsed = GetFactionInfo(i);
		if isExpanded then
			ExpandFactionHeader(i);
		end
	end

	numReps = GetNumFactions();
	
	local reps = {};

	local repHeadersIndex = 0;
	local repsIndex = 0;

	-- generate reference table
	for i = 1, numReps do
		local repName, _, _, _, _, repValue, _, _, isHeader = GetFactionInfo(i);

		if isHeader then
			-- update indexes
			repsIndex = 0;
			repHeadersIndex = repHeadersIndex + 1;
			
			-- add rep header to reps
			reps[repHeadersIndex] = {
				name = repName,
				reps = {}
			};
		else
			-- add rep to the appropriate header
			repsIndex = repsIndex + 1;
			reps[repHeadersIndex]['reps'][repsIndex] = {
				name = repName,
				value = repValue
			};
		end
	end
	
	asyncVals.reps = reps;
	callback(nil, asyncVals);
end


function getBuffs(callback, asyncVals)
	local buffs, i = { }, 1;
	local _, _, _, _, _, _, _, _, _, buff = UnitBuff("player", i);
	while buff do
		buffs[#buffs + 1] = buff;
		i = i + 1;
		_, _, _, _, _, _, _, _, _, buff = UnitBuff("player", i);
	end

	asyncVals.buffs = buffs;
	callback(nil, asyncVals);
end


function getDebuffs(callback, asyncVals)
	local debuffs, i = { }, 1;
	local _, _, _, _, _, _, _, _, _, debuff = UnitDebuff("player", i);
	while debuff do
		debuffs[#debuffs + 1] = debuff;
		i = i + 1;
		_, _, _, _, _, _, _, _, _, debuff = UnitDebuff("player", i);
	end

	asyncVals.debuffs = debuffs;
	callback(nil, asyncVals);
end


function getSkills(callback, asyncVals)
	local numSkills = GetNumSkillLines();

	-- expand all skill headers
	for i = 1, numSkills do
		local _, _, isExpanded = GetSkillLineInfo(i);
		if not isExpanded then
			ExpandSkillHeader(i)
		end
	end

	numSkills = GetNumSkillLines();
	
	local skills = {};

	local skillHeadersIndex = 0;
	local skillsIndex = 0;

	-- generate reference table
	for i = 1, numSkills do
		local skillName, isHeader, _, skillRank = GetSkillLineInfo(i);

		if isHeader then
			-- update indexes
			skillsIndex = 0;
			skillHeadersIndex = skillHeadersIndex + 1;
			
			-- add skill header to skills
			skills[skillHeadersIndex] = {
				name = skillName,
				skills = {}
			};
		else
			-- add skill to the appropriate header
			skillsIndex = skillsIndex + 1;
			skills[skillHeadersIndex]['skills'][skillsIndex] = {
				name = skillName,
				rank = skillRank
			};
		end
	end

	asyncVals.skills = skills;
	callback(nil, asyncVals);
end


function getPvp(callback, asyncVals)
	-- GetPVPRankInfo(rank[, unit])   - Get information about a specific PvP rank.

	local pvp =  {
		rank = {
			UnitPVPRank
		},
		stats = {
			lastWeekStats = GetPVPLastWeekStats(),
			lifetimeStats = GetPVPLifetimeStats(),
			rankProgress = GetPVPRankProgress(),
			sessionStats = GetPVPSessionStats(),
			thisWeekStats = GetPVPThisWeekStats(),
			yesterdayStats = GetPVPYesterdayStats()
		}
	};

	asyncVals.pvp = pvp;
	callback(nil, asyncVals)
end


function getStats(callback, asyncVals)
	local hit = GetHitModifier();
	local rangedHit = GetHitModifier();

	if hit == nil then hit = 0 end

	if not hasBiznicksBeenChecked then
		print('BIZNIKS WAS NOT CHECKED BEFORE getStats WAS CALLED...');
		print('Ranged Hit % may not be correct');
	end
	
	if hasBiznicks then
		rangedHit = rangedHit + 3
	end

	local stats = {
		health = UnitHealthMax('player'),
		mana = {
			type = { UnitPowerType('player') },
			value = UnitPowerMax('player')
		},
		armor = {
			equipped = 0,
			unit = { UnitArmor('player') }
		},
		agility = {
			equipped = 0,
			unit = { UnitStat('player', 2) }
		},
		intellect = {
			equipped = 0,
			unit =  {UnitStat('player', 4) }
		},
		spirit = {
			equipped = 0,
			unit = { UnitStat('player', 5) }
		},
		stamina = {
			equipped = 0,
			unit = { UnitStat('player', 3) }
		},
		strength = {
			equipped = 0,
			unit = { UnitStat('player', 1) }
		},
		crit = {
			spell = GetSpellCritChance(),
			melee = GetCritChance(),
			ranged = GetRangedCritChance()
		},
		mp5 = {
			equipped = 0,
			casting = 0,
			notCasting = 0,
			unit = { GetManaRegen() }
		},
		mpTick = {
			notCasting = 0
		},
		dodge = GetDodgeChance(),
		parry = GetParryChance(),
		block = {
			chance = GetBlockChance(),
			value = GetShieldBlock()
		},
		spellDamage = {
			physical = GetSpellBonusDamage(1),
			holy = GetSpellBonusDamage(2),
			fire = GetSpellBonusDamage(3),
			nature = GetSpellBonusDamage(4),
			frost = GetSpellBonusDamage(5),
			shadow = GetSpellBonusDamage(6),
			arcane = GetSpellBonusDamage(7)
		},
		defense = {
			base = 0,
			bonus = 0,
			total = 0,
			unit = { UnitDefense("player") }
		},
		healing = GetSpellBonusHealing(),
		hit = {
			melee = {
				chance = hit,
				skill = { UnitAttackBothHands('player') }
			},
			ranged = {
				chance = rangedHit,
				skill = { UnitRangedAttack('player') }
			},
			spell = GetSpellHitModifier()
		},
		attackPower = {
			melee = { UnitAttackPower('player') },
			ranged = { UnitRangedAttackPower('player') }
		},
		damage = {
			melee = { UnitDamage('player') },
			ranged = { UnitRangedDamage('player') }
		},
		speed = {
			melee = { UnitAttackSpeed('player') },
			ranged = UnitRangedDamage('player')
		},
		resist = {
			armor = { UnitResistance('player', 0) },
			holy = { UnitResistance('player', 1) },
			fire = { UnitResistance('player', 2) },
			nature = { UnitResistance('player', 3) },
			frost = { UnitResistance('player', 4) },
			shadow = { UnitResistance('player', 5) },
			arcane = { UnitResistance('player', 6) }
		},
		equip = {}
	};

	for i = 1, table.getn(slotNames) do
		local slotId = GetInventorySlotInfo(slotNames[i]);
		local itemId = GetInventoryItemID("player", slotId);
		
		if itemId ~= nil and itemId ~= 0 then
			local _, itemLink = GetItemInfo(itemId);
			
			-- compute equip
			GameTooltip:ClearLines();
			GameTooltip:SetOwner(UIParent, "ANCHOR_NONE");
			GameTooltip:SetHyperlink(itemLink);
			
			local itemEquip = {};
			for k = GameTooltip:NumLines(), 2, -1 do
				local toolTipLine = _G["GameTooltipTextLeft" .. k]:GetText() or "";

				if toolTipLine:match('Equip:') ~= nil then
					itemEquip[table.getn(itemEquip) + 1] = toolTipLine;
				end

				local itemArmor = toolTipLine:match('^(%d+) Armor$');
				if itemArmor ~= nil then
					stats.armor.equipped = stats.armor.equipped + itemArmor;
				end
			end

			if table.getn(itemEquip) > 0 then
				stats.equip[table.getn(stats.equip) + 1] = {
					id = itemId,
					bonuses = itemEquip
				};
			end

			-- compute stats
			itemStats = GetItemStats(itemLink);

			stats.agility.equipped = stats.agility.equipped + (itemStats["ITEM_MOD_AGILITY_SHORT"] or 0);
			stats.intellect.equipped = stats.intellect.equipped + (itemStats["ITEM_MOD_INTELLECT_SHORT"] or 0);
			stats.spirit.equipped = stats.spirit.equipped + (itemStats["ITEM_MOD_SPIRIT_SHORT"] or 0);
			stats.stamina.equipped = stats.stamina.equipped + (itemStats["ITEM_MOD_STAMINA_SHORT"] or 0);
			stats.strength.equipped = stats.strength.equipped + (itemStats["ITEM_MOD_STRENGTH_SHORT"] or 0);

			if itemStats["ITEM_MOD_POWER_REGEN0_SHORT"] then
				stats.mp5.equipped = stats.mp5.equipped + itemStats["ITEM_MOD_POWER_REGEN0_SHORT"] + 1;
			end

		end
	end

	GameTooltip:Hide();


	-- compute mana regen values
	local mp5Base, mp5Casting = GetManaRegen();
	-- local mp5Base, mp5Casting = 
	
	stats.mp5.casting = stats.mp5.equipped; -- Mana points regenerated every five seconds while casting and inside the five second rule
	stats.mpTick.casting = stats.mp5.equipped * 0.4; -- Mana points regenerated every tick while casting and inside the five second rule -- Ticks are every 2 seconds, or 2/5 of MP5 stat per tick.
	stats.mp5.notCasting = (mp5Base * 2) + stats.mpTick.casting; -- Total Mana points regenerated per tick while not casting and outside the five second rule

	-- compute defense values
	local baseDefense, bonusDefense = 0,0;
	local skillIndex = 0;
	
	local numSkills = GetNumSkillLines();
	
	for i = 1, numSkills do
		local skillName = select(1, GetSkillLineInfo(i));
	
		if (skillName == DEFENSE) then
			skillIndex = i;
	
			break;
		end
	end
	
	if (skillIndex > 0) then
		baseDefense = select(4, GetSkillLineInfo(skillIndex));
		bonusDefense = select(6, GetSkillLineInfo(skillIndex));
	else
		baseDefense, bonusDefense = UnitDefense("player");
	end

	stats.defense.base = baseDefense;
	stats.defense.bonus = bonusDefense;
	stats.defense.total = baseDefense + bonusDefense;

	asyncVals.stats = stats;

	callback(nil, asyncVals);
end


function ttjson(x, isInputTableArray)
	local buffer = '';

	if isInputTableArray then
		buffer = '[';
	else
		buffer = '{';
	end

	local xType = type(x)
	
	if (xType == 'table') then
		local index = 0;
		local xLen = 0;

		for _ in pairs(x) do
			xLen = xLen + 1;
		end

		for k, v in pairs(x) do
			local vType = type(v);
			index = index + 1;

			if (vType == 'table') then
				local isArr = true;

				for vKey, _ in pairs(v) do
					if (type(vKey) ~= 'number') then
						isArr = false;
					end
				end

				if isInputTableArray then
					buffer = buffer .. ttjson(v, isArr);
				else
					buffer = buffer .. jsonkv(k, ttjson(v, isArr));
				end
			elseif (vType == 'number') then
				if isInputTableArray then
					buffer = buffer .. v;
				else
					buffer = buffer .. jsonkv(k, v);
				end
			else
				if isInputTableArray then
					buffer = buffer .. '"' .. v .. '"';
				else
					buffer = buffer .. jsonkvq(k, v);
				end
			end

			if index < xLen then
				buffer = buffer .. ',';
			end
		end
	elseif (xType == 'number') then
		buffer = buffer .. x;
	else
		if (x == nil) then
			buffer = buffer .. 'null';
		else
			buffer = buffer .. '"' .. x .. '"';
		end
	end

	if isInputTableArray then
		buffer = buffer .. ']';
	else
		buffer = buffer .. '}';
	end

	return buffer;
end


function jsonkv(key, value)
	if (value == nil) then
		return string.format('"%s":null', key);
	else
		return string.format('"%s":%s', key, value);
	end
end


function jsonkvq(key, value)
	return string.format('"%s":"%s"', key, value);
end


function makeAsyncFunctionCall()

end


-- create hook
local classicArmory = CreateFrame("FRAME", "classicArmoryFrame");


-- REGISTER EVENTS
classicArmory:RegisterEvent("PLAYER_ENTERING_WORLD");


-- EVENT HANDLER
function classicArmoryEventHandler(self, event, ...)
	if ( event == "PLAYER_ENTERING_WORLD" ) then
		classicArmoryInit();
	end
end


-- SET SCRIPT
classicArmory:SetScript("OnEvent", classicArmoryEventHandler);


function dumpvar(data)
    -- cache of tables already printed, to avoid infinite recursive loops
    local tablecache = {}
    local buffer = ""
    local padder = "    "

    local function _dumpvar(d, depth)
        local t = type(d)
        local str = tostring(d)
        if (t == "table") then
            if (tablecache[str]) then
                -- table already dumped before, so we dont
                -- dump it again, just mention it
                buffer = buffer.."<"..str..">\n"
            else
                tablecache[str] = (tablecache[str] or 0) + 1
                buffer = buffer.."("..str..") {\n"
                for k, v in pairs(d) do
                    buffer = buffer..string.rep(padder, depth+1).."["..k.."] => "
                    _dumpvar(v, depth+1)
                end
                buffer = buffer..string.rep(padder, depth).."}\n"
            end
        elseif (t == "number") then
            buffer = buffer.."("..t..") "..str.."\n"
        else
            buffer = buffer.."("..t..") \""..str.."\"\n"
        end
    end
    _dumpvar(data, 0)
    return buffer
end

-- function CA_Item_Enchant_GetText()
-- 	local hasBiznicks = false;
-- 	local MATCH_ENCHANT = ENCHANTED_TOOLTIP_LINE:gsub('%%s', '(.+)')
-- 	local ENCHANT_PATTERN = ENCHANTED_TOOLTIP_LINE:gsub('%%s', '(.+)') --moving outside of the function might not be warranted but moving outside of for loop is
-- 	local tooltip = CreateFrame("GameTooltip", "CAScanTooltip", nil, "GameTooltipTemplate") --TODO: use the same frame for both repairs and itemlevel
-- 	tooltip:SetOwner(UIParent, "ANCHOR_NONE")

-- 	-- for a, b in ipairs(CAITEM_SLOT_FRAMES) do
-- 	-- 	print(a)
-- 	-- 	print(dumpvar(a))
-- 	-- 	print(b)
-- 	-- 	print(dumpvar(b))
-- 	-- end

-- 	-- for a in CAITEM_SLOT_FRAMES do
-- 	-- 	print(dumpvar(CAITEM_SLOT_FRAMES[a]))
-- 	-- end

-- 	-- print(ttjson(ipairs(CAITEM_SLOT_FRAMES), false))

-- 	for _, v in ipairs(CAITEM_SLOT_FRAMES) do
-- 		-- local slotId, textureName = GetInventorySlotInfo(v) --Call for string parsing instead of table lookup, bleh.
-- 		local item = Item:CreateFromEquipmentSlot(v:GetID())
-- 		local itemLink = GetInventoryItemLink("player", v:GetID())
-- 		if itemLink then
-- 			local itemName, itemStringLink = GetItemInfo(itemLink)
-- 			if itemStringLink then
-- 				local _, _, Color, Ltype, Id, Enchant, Gem1, Gem2, Gem3, Gem4, Suffix, Unique, LinkLvl, Name = string.find(itemStringLink,
-- 				"|?c?f?f?(%x*)|?H?([^:]*):?(%d+):?(%d*):?(%d*):?(%d*):?(%d*):?(%d*):?(%-?%d*):?(%-?%d*):?(%d*):?(%d*):?(%-?%d*)|?h?%[?([^%[%]]*)%]?|?h?|?r?")
-- 				if (slot == CharacterRangedSlot) then
-- 					if (Enchant == 2523) then
-- 						hasBiznicks = true
-- 					end
-- 				end
-- 			end
-- 			tooltip:ClearLines()
-- 			tooltip:SetHyperlink(itemLink)
-- 		end
-- 	end

-- 	return hasBiznicks;
-- end