-- ClassicArmory
-- David Whynot
-- v0.1


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
	"Bag0Slot",
	"Bag1Slot",
	"Bag2Slot",
	"Bag3Slot"
}


-- MAIN
print("--------------------------------------");
print('ClassicArmory main')
print("--------------------------------------");


function classicArmoryInit()
	
	print("--------------------------------------");
	print('ClassicArmory init')
	print("--------------------------------------");

	-- export data frame
		local exportDataFrame = CreateFrame("Frame", "exportDataFrame", UIParent);

		exportDataFrame:SetFrameStrata("BACKGROUND");
		exportDataFrame:SetWidth(280);
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
			helpText:SetText("Press ctrl-c to copy the text below.\nThen, press ctrl-v anywhere on\ndavidwhynot.com to upload your character.");

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
					exportDataTextFrame:SetText(getEquipmentJSON());
					exportDataTextFrame:HighlightText();
				end
			);

			exportDataTextFrame:SetScript("OnEditFocusGained",
			function()
					exportDataTextFrame:SetText(getEquipmentJSON());
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
				exportDataTextFrame:SetText(getEquipmentJSON());
				exportDataTextFrame:SetFocus();
			end
		);

end

function getEquipmentJSON()
	local output = '{';

	local slotNamesLengthMinusOne = table.getn(slotNames) - 1;

	for i = 1, slotNamesLengthMinusOne do
		output = output .. getSlotJSON(slotNames[i]) .. ',';
	end

	output = output .. getSlotJSON(slotNames[table.getn(slotNames)]);
	
	return output .. '}';
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

-- function()
--     local ammoSlot = GetInventorySlotInfo("AmmoSlot");
--     local ammoCount = GetInventoryItemCount("player", ammoSlot);
--     if ((ammoCount == 1) and (not GetInventoryItemTexture("player", ammoSlot))) then
--         ammoCount = 0;
--     end;
    
--     return ammoCount
-- end


-- create hook
local classicArmory = CreateFrame("FRAME", "classicArmoryFrame");

-- REGISTER EVENTS
classicArmory:RegisterEvent("PLAYER_ENTERING_WORLD");
-- classicArmory:RegisterEvent("CHAT_MSG_CHANNEL");

-- EVENT HANDLER
local function classicArmoryEventHandler(self, event, ...)
	print("event: " .. event);
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
