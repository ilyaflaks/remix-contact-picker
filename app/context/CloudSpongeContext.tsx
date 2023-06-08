import React, { useState, useEffect, createContext, useContext } from 'react';

const CloudSpongeContext = createContext<any>({});

// initialze the CloudSponge Contact Picker with options here:
const CloudSpongeProvider = ({ options, children }) => {
  const [script, setScript] = useState<any>(null);

  // Event Filtering
  const [filters] = useState([]);

  const addScript = () => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute("src", `https://api.cloudsponge.com/widget/${options.key}.js`);
    script.setAttribute("id", "cloudsponge-script");

    // register any options that got passed in the old way
    on('beforeDisplayContacts', options.beforeDisplayContacts);
    on('afterSubmitContacts', options.afterSubmitContacts);

    script.onload = () => {
      // use the cloudsponge object to keep our stuff around
      window.cloudsponge?.init({
        ...options,
        beforeDisplayContacts: triggerEvents('beforeDisplayContacts'),
        afterSubmitContacts: triggerEvents('afterSubmitContacts'),
        afterClosing: () => {
          triggerEvents('afterClosing');
          // we clean up all the filters before launching the contact picker again
          filters.length = 0;
        },
      });
    };

    head?.appendChild(script);
    setScript(script);
  }

  const removeScript = () => {
    if (script) {
      head?.removeChild(script);
      setScript(null);
      setCloudsponge(null);
    }
  }

  // reset the script if necessary
  // then add the cloudsponge script to the page and initialize it
  useEffect(() => {
    if (!window.cloudsponge) {
      removeScript();
      // add the script to the page globally
      addScript();
    }
    return () => {
      removeScript();
    }
  }, []);

  /*
  / event handling here
  */
  const [events] = useState<any>({
    beforeDisplayContacts: [],
    afterSubmitContacts: [],
    afterClosing: [],
  });

  const hasFn = (e, fn, filter) => (events[e] && events[e].includes && events[e].find((e) => [e[0], e[1]] == [fn, filter]));

  const triggerEvents = (e) => (
    (...args) => {
      events[e] && events[e].forEach(([fn, filter]) => {
        try {
          if (!filter || filters.includes(filter)) {
            fn.apply(null, [...args, filter]);
          }
        } catch(e) {
          console.error(e);
        }
      });
    }
  );

  const on = (e, fn, filter) => {
    if (fn && !hasFn(e, fn, filter)) {
      events[e] = [
        ...events[e],
        [fn, filter],
      ];
    }
  };

  const off = (e, fn) => {
    if (fn && hasFn(e, fn)) {
      events[e] = events[e].filter(i => i[0] !== fn);
    }
  };

  const launch = (source, filter) => {
    if (!window.cloudsponge) {
      return;
    }
    filters.push(filter);
    // delegate the call to cloudsponge
    window.cloudsponge.launch(source);
  }

  const value = {
    on,
    off,
    launch,
    filters,
  };

  return (
    <CloudSpongeContext.Provider value={value}>
      {children}
    </CloudSpongeContext.Provider>
  );
};

// Create custom hook for using the Pusher Context
function useCloudSponge() {
  const context = useContext(CloudSpongeContext);

  if (!context) {
    throw new Error('useCloudSponge must be used within a CloudSpongeProvider');
  }
  return context;
}

export { CloudSpongeProvider, useCloudSponge };
