export const matchRoles = async function (userRole: string, roles: string[]) {
    const checkRole = roles.find((val) => {
        return val === userRole;
    });
    if (!checkRole) return false;
    return true;
};
