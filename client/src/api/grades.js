import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const ACCESS_TOKEN_KEY = getAccessToken();
const ID_TOKEN_KEY = getIdToken();
const GRADES = 'grades';