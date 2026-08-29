const CurrentUserContext = createContext();
export default CurrentUserContext;
<CurrentUserContext.Provider value={currentUser}>
  ...
</CurrentUserContext.Provider>;
