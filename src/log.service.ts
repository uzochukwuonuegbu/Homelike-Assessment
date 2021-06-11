import { generalConfig } from './config';

export interface LoggerConfig {
  serviceName?: string;
  lambdaRequestId?: string;
}

// JUST a proof of concept!
// Ideally would use a 3rd party service. e.g Logz
class LoggingService {
  config: LoggerConfig;

  constructor() {
  }

  infoLog(msg: string, data?: any) {
    this.log(msg, 'INFO', data);
  }

  errorLog(msg: string, data) {
    const additionalData = this.formatErrorData(data);
    this.log(msg, 'ERROR', { ...data, ...additionalData });
  }

  debugLog(msg: string, data) {
    const additionalData = this.formatErrorData(data);
    this.log(msg, 'DEBUG', { ...data, ...additionalData });
  }

  log(msg: string, lvl: string, data) {
    // tslint:disable-next-line: no-console
    console.log(msg, data || null);
    if (generalConfig.isOffline) {
      return;
    }
    const { serviceName, lambdaRequestId } = this.config;
    
    // Ideally would use the logger service(e.g Logz) here instead of console.log()
    console.log({
      message: msg,
      stage: generalConfig.env,
      level: lvl,
      data: {
        ...data,
        serviceName,
        lambdaRequestId,
      },
    });
  }

  private getErrorObject(data: any) {
    const errorObj = data?.error || data?.err || data?.e;
    if (errorObj) {
      return errorObj;
    }
    return data instanceof Error ? data : undefined;
  }

  private formatErrorData(data: any) {
    const logData: any = {};
    const errorObj = this.getErrorObject(data);
    if (errorObj) {
      delete logData?.e;
      delete logData?.err;
      delete logData?.error;
      const errorData = JSON.parse(JSON.stringify(errorObj, Object.getOwnPropertyNames(errorObj)));
      Object.entries(errorData).map(([key, value]) => {
        logData[key] = JSON.stringify(value);
      });
    }
    return logData;
  }
}

export default new LoggingService();
