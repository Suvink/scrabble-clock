/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */

import React, { createContext, useContext, useState } from 'react';

const GameStateContext = createContext();

export const useGameState = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error('useGameState must be used within a GameStateProvider');
    }
    return context;
};

export const GameStateProvider = ({ children }) => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    return (
        <GameStateContext.Provider value={{ isGameStarted, setIsGameStarted }}>{children}</GameStateContext.Provider>
    );
};
