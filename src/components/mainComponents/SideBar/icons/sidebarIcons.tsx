import { ReactNode } from "react";

export const sidebarIcons = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"/>
      <rect x="13" y="3" width="8" height="5" rx="2" fill="currentColor"/>
      <rect x="13" y="10" width="8" height="11" rx="2" fill="currentColor"/>
      <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor"/>
    </svg>
  ),
  saved: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 3H18C19.1046 3 20 3.89543 20 5V21L12 17L4 21V5C4 3.89543 4.89543 3 6 3Z" fill="currentColor"/>
    </svg>
  ),
  done: (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="green">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  noDone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="red">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  performing: (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="#001eff">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  tag: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.59 13.41L11 3H4v7l9.59 9.59a2 2 0 0 0 2.82 0l4.18-4.18a2 2 0 0 0 0-2.82ZM6.5 8A1.5 1.5 0 1 1 8 6.5 1.5 1.5 0 0 1 6.5 8Z"/>
    </svg>
  ),
  status: (
    <svg xmlns="http://www.w3.org/2000/svg" 
     width="18" 
     height="18" 
     viewBox="0 0 24 24" 
     fill="none" 
     stroke="currentColor" 
     stroke-width="2" 
     stroke-linecap="round" 
     stroke-linejoin="round">
     
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12l3 3 5-5"/>
      
    </svg>
  ),
  users: (
    <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            d="M16 11C17.6569 11 19 9.65685 19 8C19 6.34315 17.6569 5 16 5C14.3431 5 13 6.34315 13 8C13 9.65685 14.3431 11 16 11Z" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <path 
            d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <path 
            d="M2 19C2 16.7909 3.79086 15 6 15C8.20914 15 10 16.7909 10 19" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <path 
            d="M14 19C14 16.7909 15.7909 15 18 15C20.2091 15 22 16.7909 22 19" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
    </svg>

  ),
};
