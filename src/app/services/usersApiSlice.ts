import { api } from "./api";

const usersApi = api.injectEndpoints({
	endpoints: builder => ({
		inviteUser: builder.mutation<
			any,
			{
				tenant: string;
			}
		>({
			query({ tenant, ...user }) {
				return {
					url: `${tenant}/invite`,
					method: "POST",
					body: {
						"userEmail": "corradin.loris@gmail.com",
						"username": "corradin.loris@gmail.com",
						"name": "Loris",
						"lastName": "Corradin",
						"role": "admin"
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