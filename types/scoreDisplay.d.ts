type holeDetail = {
  holeNumber: number;
  parNumber: number | null;
  golfScore: number | null;
  puttsNumber: number | null;
  formScore: number | null;
};

type roundDetail = {
  date: Date;
  golfPlaceName: string;
  roundId: number;
  holeDetails: holeDetail[];
};

type monthScoreLog = {
  year: number;
  month: number;
  roundDetails: roundDetail[];
};

type movieDetail = {
  id: number;
  date: Date;
  status: number;
  formScore: number | null;
  roundId: number | null;
};

type monthMovieLog = {
  year: number;
  month: number;
  movieDetails: movieDetail[];
};

export {
  holeDetail,
  roundDetail,
  monthScoreLog,
  movieDetail,
  monthMovieLog,
  Logs,
};
