import { useState, useEffect } from "react";
import { IRepository } from "../types/repository";
import scansMock from "../services/mocks/scans";

const useScans = (repo?: IRepository) => {
  const [scans, setScans] = useState();
  const [loading, setLoading] = useState(true);
  const [, setState] = useState();

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        setLoading(true);
        const auxScans = await new Promise(resolve => {
          setTimeout(() => {
            resolve(scansMock);
          }, 2000);
        });
        if (isSubscribed) {
          setScans(auxScans);
        }
      } catch (e) {
        setState(() => {
          throw e;
        });
      }

      if (isSubscribed) {
        setLoading(false);
      }
    })();

    // clean up
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line
  }, [repo?.idRepository]);

  return { loading, scans };
};

export default useScans;
