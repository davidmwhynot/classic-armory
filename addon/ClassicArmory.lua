-- ClassicArmory
-- David Whynot
-- v0.3


-- GLOBALS

local count = 0;
local debug = false;
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
	-- "RelicSlot",
	"Bag0Slot",
	"Bag1Slot",
	"Bag2Slot",
	"Bag3Slot"
}
local slotNamesLengthMinusOne = table.getn(slotNames) - 1;


-- MAIN
-- print("--------------------------------------");
-- print('ClassicArmory main')
-- print("--------------------------------------");


function classicArmoryInit()
	
	-- print("--------------------------------------");
	-- print('ClassicArmory init')
	-- print("--------------------------------------");

	-- export data frame
		local exportDataFrame = CreateFrame("Frame", "exportDataFrame", UIParent, "BackdropTemplate");

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
					exportDataTextFrame:SetText(getJSON());
					exportDataTextFrame:HighlightText();
				end
			);

			exportDataTextFrame:SetScript("OnEditFocusGained",
			function()
					exportDataTextFrame:SetText(getJSON());
					exportDataTextFrame:HighlightText();
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
				exportDataFrame:Show();
				exportDataTextFrame:SetText(getJSON());
				exportDataTextFrame:SetFocus();
			end
		);

end

function getJSON()
	local output = '{"v": "1.0.0",';

	-- add meta json
	local playerName = UnitName("player");
	output = output .. '"name":"' .. playerName .. '",';

	local playerRealm = GetRealmName();
	output = output .. '"realm":"' .. playerRealm .. '",';
	
	local playerRace = UnitRace("player");
	output = output .. '"race":"' .. playerRace .. '",';
	
	local playerLevel = UnitLevel("player");
	output = output .. '"level":' .. playerLevel .. ',';
	
	local playerClass = UnitClass("player");
	output = output .. '"class":"' .. playerClass .. '",';
	
	local playerGuild = GetGuildInfo("player");
	if playerGuild ~= nil then
		output = output .. '"guild":"' .. playerGuild .. '",';
	end

	-- add armor json
	-- local baseArmor, effectiveArmor, armor, posBuff, negBuff = UnitArmor("player");
	local playerBaseArmor = UnitArmor("player");
	output = output .. '"armor":"' .. playerBaseArmor .. '",'

	-- add stats json
	local totalAgility, _, posCountAgility, negCountAgility = UnitStat("player", 2);
	local totalIntellect, _, posCountIntellect, negCountIntellect = UnitStat("player", 4);
	local totalSpirit, _, posCountSpirit, negCountSpirit = UnitStat("player", 5);
	local totalStamina, _, posCountStamina, negCountStamina = UnitStat("player", 3);
	local totalStrength, _, posCountStrength, negCountStrength = UnitStat("player", 1);

	local armorAgility, armorIntellect, armorSpirit, armorStamina, armorStrength, equipBonuses = getCharStats();

	local equippedAgility = totalAgility - (posCountAgility + negCountAgility) + armorAgility;
	output = output .. '"agility":' .. equippedAgility .. ',';

	local equippedIntellect = totalIntellect - (posCountIntellect + negCountIntellect) + armorIntellect;
	output = output .. '"intellect":' .. equippedIntellect .. ',';

	local equippedSpirit = totalSpirit - (posCountSpirit + negCountSpirit) + armorSpirit;
	output = output .. '"spirit":' .. equippedSpirit .. ',';

	local equippedStamina = totalStamina - (posCountStamina + negCountStamina) + armorStamina;
	output = output .. '"stamina":' .. equippedStamina .. ',';

	local equippedStrength = totalStrength - (posCountStrength + negCountStrength) + armorStrength;
	output = output .. '"strength":' .. equippedStrength .. ',';

	-- add skills json
	output = output .. '"skills":'.. getSkillsJSON() .. ',';

	-- add equip json
	if table.getn(equipBonuses) > 0 then
		local playerEquipBonuses = '"equip":[';

		equipBonusesLengthMinusOne = table.getn(equipBonuses) - 1;
		for i = 1, equipBonusesLengthMinusOne do
			playerEquipBonuses = playerEquipBonuses .. equipBonuses[i] .. ',';
		end

		playerEquipBonuses = playerEquipBonuses .. equipBonuses[table.getn(equipBonuses)] .. '],';

		output = output .. playerEquipBonuses;
	end

	-- add item json
	output =  output .. '"items":[';

	for i = 1, slotNamesLengthMinusOne do
		output = output .. '{' .. getSlotJSON(slotNames[i]) .. '},';
	end

	output = output .. '{' .. getSlotJSON(slotNames[table.getn(slotNames)]);
	
	return output .. '}]}';
end

function getSlotJSON(slotName)
	local output = "\"" .. slotName .. "\":";

	local slotId = GetInventorySlotInfo(slotName)
	local itemId = GetInventoryItemID("player", slotId)
	
	if itemId == nil then
		return output .. 'null';
	else
		return output .. itemId;
	end
end

function getSkillsJSON()
	local numSkills = GetNumSkillLines();

	-- expand all skill headers
	for i = 1, numSkills do
		local _, _, isExpanded = GetSkillLineInfo(i);
		if not isExpanded then
			ExpandSkillHeader(i)
		end
	end

	numSkills = GetNumSkillLines();
	
	local skillHeaders = {};
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
			
			-- map header name to index in skills table
			skillHeaders[skillHeadersIndex] = skillName;
			skills[skillHeadersIndex] = {};
		else
			-- add skill to the appropriate header
			skillsIndex = skillsIndex + 1;
			skills[skillHeadersIndex][skillsIndex] = '{"name":"' .. skillName .. '","rank":' .. skillRank .. '}';
		end
	end

	-- build json from reference table
	local output = '[';

	local skillsLengthMinusOne = table.getn(skills) - 1;
	for i = 1, skillsLengthMinusOne do
		local skillHeaderJSON = '{"name":"' .. skillHeaders[i] .. '","skills":[';
		
		local skillsHeaderLengthMinusOne = table.getn(skills[i]) - 1;
		for j = 1, skillsHeaderLengthMinusOne do
			skillHeaderJSON = skillHeaderJSON .. skills[i][j] .. ',';
		end

		output = output .. skillHeaderJSON .. skills[i][table.getn(skills[i])] .. "]},";
	end

	-- add the final skill header's skills to the output JSON
	local skillHeaderJSON = '{"name":"' .. skillHeaders[table.getn(skills)] .. '","skills":[';
		
	local skillsHeaderLengthMinusOne = table.getn(skills[table.getn(skills)]) - 1;
	for j = 1, skillsHeaderLengthMinusOne do
		skillHeaderJSON = skillHeaderJSON .. skills[table.getn(skills)][j] .. ',';
	end

	output = output .. skillHeaderJSON .. skills[table.getn(skills)][table.getn(skills[table.getn(skills)])] .. "]}]";

	-- output = '"skillHeaders: ' .. dumpvar(skillHeaders) .. '\nskills:' .. dumpvar(skills) ..'"';
	
	return output;
end

function getCharStats()
	local stamina = 0;
	local strength = 0;
	local agility = 0;
	local intellect = 0;
	local spirit = 0;
	local equip = {};

	for i = 1, table.getn(slotNames) do
		local slotId = GetInventorySlotInfo(slotNames[i]);
		local itemId = GetInventoryItemID("player", slotId);
		
		if itemId ~= nil and itemId ~= 0 then
			local _, itemLink = GetItemInfo(itemId);
			
			-- compute equip
			GameTooltip:ClearLines();
			GameTooltip:SetOwner(UIParent, "ANCHOR_NONE");
			GameTooltip:SetHyperlink(itemLink);
			
			local itemEquip = '';
			for k=GameTooltip:NumLines(),2,-1 do
				local toolTipLine = _G["GameTooltipTextLeft" .. k]:GetText() or "";

				if toolTipLine:match('Equip:') ~= nil then
					if itemEquip == '' then
						itemEquip = '"' .. toolTipLine .. '"';
					else
						itemEquip = itemEquip .. ',"' .. toolTipLine .. '"';
					end
				end
			end

			if itemEquip ~= '' then
				equip[table.getn(equip) + 1] = '{"' .. itemId .. '":[' .. itemEquip .. ']}';
			end

			-- compute stats
			itemStats = GetItemStats(itemLink);

			agility = agility + (itemStats["ITEM_MOD_AGILITY_SHORT"] or 0);
			intellect = intellect + (itemStats["ITEM_MOD_INTELLECT_SHORT"] or 0);
			spirit = spirit + (itemStats["ITEM_MOD_SPIRIT_SHORT"] or 0);
			stamina = stamina + (itemStats["ITEM_MOD_STAMINA_SHORT"] or 0);
			strength = strength + (itemStats["ITEM_MOD_STRENGTH_SHORT"] or 0);

		end
	end

	GameTooltip:Hide();

	return agility, intellect, spirit, stamina, strength, equip;
end


-- create hook
local classicArmory = CreateFrame("FRAME", "classicArmoryFrame");

-- REGISTER EVENTS
classicArmory:RegisterEvent("PLAYER_ENTERING_WORLD");
-- classicArmory:RegisterEvent("CHAT_MSG_CHANNEL");

-- EVENT HANDLER
local function classicArmoryEventHandler(self, event, ...)
	if ( event == "PLAYER_ENTERING_WORLD" ) then
		classicArmoryInit();
	end
end

-- SET SCRIPT
classicArmory:SetScript("OnEvent", classicArmoryEventHandler);





function outterClassicArmoryDebug(s)
	if debug then
		print("oDEBUG: " .. s);
	end
end

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