"use client";

import type { editor } from "monaco-editor";

export const lightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: '', foreground: '1F2937' },
    { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
    { token: 'keyword', foreground: '7C3AED' },
    { token: 'string', foreground: '059669' },
    { token: 'number', foreground: 'DC2626' },
    { token: 'regexp', foreground: 'AA5D00' },
    { token: 'type', foreground: '2563EB' },
    { token: 'function', foreground: 'D97706' },
    { token: 'variable', foreground: '1F2937' },
    { token: 'variable.predefined', foreground: '7C3AED' },
    { token: 'constant', foreground: 'DC2626' },
    { token: 'punctuation', foreground: '6B7280' },
    // TSX/JSX specific tokens using markup
    { token: 'markup.tag', foreground: 'BE185D' },  // JSX tags
    { token: 'markup.bracket', foreground: 'BE185D' },  // < > brackets
    { token: 'markup.attribute.name', foreground: '7C3AED' },  // JSX attribute names
    { token: 'markup.attribute.value', foreground: '059669' },  // JSX attribute values
    { token: 'markup.content', foreground: '1F2937' },  // Content inside JSX tags
    
    // Additional tokens that might be useful
    { token: 'delimiter.bracket', foreground: 'BE185D' },  // Other brackets
    { token: 'delimiter.parenthesis', foreground: '6B7280' },  // Parentheses
    { token: 'delimiter.square', foreground: '6B7280' },  // Square brackets
    { token: 'delimiter.angle', foreground: 'BE185D' },  // Angle brackets (might be used for type assertions)
    { token: 'tag', foreground: 'BE185D' },  // Fallback for tags
  ],
  colors: {
    'editor.background': '#FFFFFF', // --background
    'editor.foreground': '#1F2937', // --foreground
    'editorLineNumber.foreground': '#6B7280', // --muted-foreground
    'editor.selectionBackground': '#F3F4F6', // --accent
    'editor.inactiveSelectionBackground': '#E5E7EB', // Darker version of --accent
    'editorIndentGuide.background': '#E5E7EB', // --accent
    'editorIndentGuide.activeBackground': '#D1D5DB', // Darker version of --accent
    'editor.lineHighlightBackground': '#F3F4F6', // --accent
    'editorCursor.foreground': '#111827', // --primary
    'editorWhitespace.foreground': '#D1D5DB', // Darker version of --accent
    'editorBracketMatch.background': '#F3F4F6', // --accent
    'editorBracketMatch.border': '#6B7280', // --muted-foreground
  }
} satisfies editor .IStandaloneThemeData;

export const darkTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: 'D1D5DB' },
    { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'A78BFA' },
    { token: 'string', foreground: '34D399' },
    { token: 'number', foreground: 'F87171' },
    { token: 'regexp', foreground: 'FCD34D' },
    { token: 'type', foreground: '60A5FA' },
    { token: 'function', foreground: 'FBBF24' },
    { token: 'variable', foreground: 'D1D5DB' },
    { token: 'variable.predefined', foreground: 'A78BFA' },
    { token: 'constant', foreground: 'F87171' },
    { token: 'punctuation', foreground: '9CA3AF' },
    // TSX/JSX specific tokens using markup
    { token: 'markup.tag', foreground: 'FF6B6B' },  // JSX tags
    { token: 'markup.bracket', foreground: 'FF6B6B' },  // < > brackets
    { token: 'markup.attribute.name', foreground: 'FFD93D' },  // JSX attribute names
    { token: 'markup.attribute.value', foreground: '6BF178' },  // JSX attribute values
    { token: 'markup.content', foreground: 'D1D5DB' },  // Content inside JSX tags
    
    // Additional tokens that might be useful
    { token: 'delimiter.bracket', foreground: 'FF6B6B' },  // Other brackets
    { token: 'delimiter.parenthesis', foreground: '9CA3AF' },  // Parentheses
    { token: 'delimiter.square', foreground: '9CA3AF' },  // Square brackets
    { token: 'delimiter.angle', foreground: 'FF6B6B' },  // Angle brackets (might be used for type assertions)
    { token: 'tag', foreground: 'FF6B6B' },  // Fallback for tags
  ],
  colors: {
    'editor.background': '#030712', // --background
    'editor.foreground': '#D1D5DB', // --foreground
    'editorLineNumber.foreground': '#6B7280', // --muted-foreground
    'editor.selectionBackground': '#374151', // --accent
    'editor.inactiveSelectionBackground': '#1F2937', // Darker version of --accent
    'editorIndentGuide.background': '#374151', // --accent
    'editorIndentGuide.activeBackground': '#4B5563', // Lighter version of --accent
    'editor.lineHighlightBackground': '#1F2937', // Darker version of --accent
    'editorCursor.foreground': '#F3F4F6', // --primary
    'editorWhitespace.foreground': '#4B5563', // Lighter version of --accent
    'editorBracketMatch.background': '#374151', // --accent
    'editorBracketMatch.border': '#6B7280', // --muted-foreground
  }
} satisfies editor .IStandaloneThemeData;