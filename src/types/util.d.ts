interface UseInterval {
    repeatInterval: number;
    maxInterval: number;
    stop: boolean;
    exit: boolean;
    restart: boolean;
    onInterval(): void;
    onExit(): void;
    onStop(): void;
}

interface UseAdvancedInterval {
    maxTicks: number;
    interval: number;
    onTick?(): void;
    onExit?(): void;
    onElapsed?(): void;
    onRestart?(): void;
}
interface TimerInfo {
    totalTicks: number;
    numOfRestarts: number;
    numOfElapsed: number;
    numOfExits: number;
}

type VoidFn = () => void;
type InfoFn = () => TimerInfo;
type UpdatePropsFn = (interval: number, maxTicks: number) => void;

interface ResponseOrError<T> {
    response?: T | null;
    error?: Error;
}

interface OrderBy {
    name: string;
    direction: 'desc' | 'asc';
}
