export const getFaceVertices = (face, vertices) => {
    const { a, b, c } = face;
    const faceVertices1 = Object.values({ a, b, c }).reduce(
        (faceVertices, comp) => {
            faceVertices.push(vertices.getX(comp));
            faceVertices.push(vertices.getY(comp));
            faceVertices.push(vertices.getZ(comp));
            return faceVertices;
        },
        []
    );
    return faceVertices1;
};