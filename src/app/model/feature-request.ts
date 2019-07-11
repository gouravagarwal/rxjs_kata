export class FeatureRequest {
    constructor(id: number, featureName:string, complexity: number, priority:number) {
        this.id = id;
        this.complexity = complexity;
        this.featureName = featureName;
        this.priority = priority;
    }

    public id: number;
    public featureName: string;
    public complexity: number;
    public priority: number;
}