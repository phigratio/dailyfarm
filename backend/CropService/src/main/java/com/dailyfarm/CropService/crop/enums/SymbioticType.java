package com.dailyfarm.CropService.crop.enums;

public enum SymbioticType {  // Shared with AnimalService for consistency
    MUTUALISTIC,    // Both benefit (e.g., bees pollinating crops)
    COMMENSAL,      // One benefits, other unaffected (e.g., birds nesting in fields)
    PARASITIC,      // One benefits at other's expense (monitor to avoid)
    INTEGRATED      // Deliberate farm design (e.g., aquaponics)
}