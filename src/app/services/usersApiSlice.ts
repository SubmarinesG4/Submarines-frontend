import { UserRole } from "@/types/User";
import { api } from "./api";

const usersApi = api.injectEndpoints({
	endpoints: builder => ({
		inviteUser: builder.mutation<
			any,
			{
				tenant: string;
				userEmail: string,
				name: string,
				lastName: string,
				role: UserRole
			}
		>({
			query({ tenant, ...user }) {
				return {
					url: `${tenant}/invite`,
					method: "POST",
					body: {
						...user,
						username: user.userEmail
					}
				}
			},
			invalidatesTags: (result, error, arg) => [
				{ type: "Tenant", id: arg.tenant },
			],
		}),
		deleteUser: builder.mutation<
			any,
			{
				tenant: string;
				username: string
			}
		>({
			query({ tenant, username }) {
				return {
					url: `${tenant}/user`,
					method: "DELETE",
					body: { username }
				};
			},
			invalidatesTags: (result, error, arg) => [
				{ type: "Tenant", id: arg.tenant },
			],
		}),
	})
})


export const {
	useDeleteUserMutation,
	useInviteUserMutation
} = usersApi;