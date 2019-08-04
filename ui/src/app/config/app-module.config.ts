/**
 * APPLICATION SERVICES
 */

import * as AppServices from '../services/index';
import { AuthGuard } from '../guards/auth.guard';

export const APPLICATION_SERVICES = [
    AppServices.AlertService,
    AppServices.ApiService,
    AuthGuard
]