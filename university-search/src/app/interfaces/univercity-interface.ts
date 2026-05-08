export interface UnivercityInterface {
    name: string;
    alpha_two_code: string;
    country: string;
    domains: string[];
    web_pages: string[];
    'state-province': string | null;
    saved?: boolean;
}
