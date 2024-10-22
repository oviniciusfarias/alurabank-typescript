export function locarTempoDeExecucao() {
    return function (target, propertyKey, descriptor) {
        return descriptor;
    };
}
