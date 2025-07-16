# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fully functional MedLife Partnership Portal with React + TypeScript frontend and Supabase backend integration.

## Repository Structure

The repository contains:
- `CLAUDE.md` - This guidance file  
- `medlife-ppp/` - Main application directory
- `medlife-ppp/src/` - React application source code
- `medlife-ppp/database/` - Supabase database schema
- `medlife-ppp/.env.local` - Environment variables (Supabase credentials)

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server (http://localhost:3000/)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Architecture Overview

React + TypeScript application with:
- **Frontend**: React 18 with TypeScript, Vite build tool
- **Styling**: Tailwind CSS with medical-themed color palette
- **Routing**: React Router for navigation
- **Structure**: 
  - `src/components/` - Reusable UI components
  - `src/pages/` - Route-based page components
  - `src/` - Main app and styling files

## Notes

- No existing README.md, package.json, or other configuration files found
- No Cursor rules or Copilot instructions present
- Repository is ready for initial development

## Tasks 

1. First think through the problem, read the codebase for relevant files, and then write a plan
2. The plan should have a list of todo items that you can check off as you complete them 
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.