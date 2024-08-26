// src/hooks/useAppSelector.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
